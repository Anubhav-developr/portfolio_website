"use client";

import { Suspense, type MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

type SpaceSceneProps = {
  isMobile: boolean;
};

type SceneProgress = {
  t: number;
  mouseX: number;
  mouseY: number;
};

type ProgressRef = MutableRefObject<SceneProgress>;

const theme = {
  blue: "#6388ff",
  violet: "#a78bfa",
  cyan: "#38bdf8",
  green: "#34d399",
  void: "#020304"
};

const projectNodes = [
  { label: "ExamPulse", color: theme.blue },
  { label: "POAS", color: theme.violet },
  { label: "PeacePages", color: theme.cyan }
];

export function SpaceScene({ isMobile }: SpaceSceneProps) {
  const progressRef = useRef<SceneProgress>({ t: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      progressRef.current.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      progressRef.current.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1.6, 9], fov: isMobile ? 62 : 54, near: 0.1, far: 90 }}
      className="h-full w-full"
      dpr={isMobile ? [1, 1.25] : [1, 1.75]}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance"
      }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={[theme.void]} />
        <ambientLight intensity={0.18} />
        <pointLight position={[2.8, 2.4, 5]} color={theme.blue} intensity={6} distance={16} />
        <pointLight position={[-4, 1.8, -4]} color={theme.cyan} intensity={3.2} distance={14} />
        <ScrollCamera progressRef={progressRef} isMobile={isMobile} />
        <Starfield progressRef={progressRef} count={isMobile ? 750 : 2200} />
        <Planet progressRef={progressRef} />
        <MoonSatellite />
        <ProjectBelt progressRef={progressRef} isMobile={isMobile} />
        <SkillsNebula progressRef={progressRef} count={isMobile ? 360 : 920} />
        <SignalBeacon />
        {!isMobile ? (
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.62} luminanceThreshold={0.18} luminanceSmoothing={0.82} mipmapBlur />
          </EffectComposer>
        ) : null}
      </Suspense>
    </Canvas>
  );
}

function ScrollCamera({ progressRef, isMobile }: { progressRef: ProgressRef; isMobile: boolean }) {
  const { camera } = useThree();
  const position = useMemo(() => new THREE.Vector3(), []);
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  const cameraPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          // 0.00 - Hero: establish the wide Anubhav Planet universe.
          new THREE.Vector3(0, 1.6, 9),
          // 0.18 - Hero: orbit closer to the glowing planet without replacing the video layer.
          new THREE.Vector3(2.2, 1.15, 5.4),
          // 0.34 - About/Profile: pass toward the moon/satellite identity marker.
          new THREE.Vector3(-2.9, 1.25, 1.4),
          // 0.52 - Projects: fly through the asteroid belt of project nodes.
          new THREE.Vector3(0.2, 0.65, -4.8),
          // 0.68 - Skills: drift into the blue/violet/teal nebula cloud.
          new THREE.Vector3(5.2, 1.35, -10.2),
          // 0.84 - Experience/Proof: keep the motion continuous through deep space.
          new THREE.Vector3(-2.8, 1.1, -15.4),
          // 1.00 - Contact: pull back to a wide starfield and signal beacon.
          new THREE.Vector3(0, 2.7, -23)
        ],
        false,
        "catmullrom",
        0.55
      ),
    []
  );

  const targetPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0.05, 0),
          new THREE.Vector3(0, 0.15, 0),
          new THREE.Vector3(-3.35, 0.72, -1.35),
          new THREE.Vector3(0, 0.08, -7.2),
          new THREE.Vector3(5.2, 0.15, -12),
          new THREE.Vector3(0.6, -0.15, -17.2),
          new THREE.Vector3(0, -0.25, -18.6)
        ],
        false,
        "catmullrom",
        0.5
      ),
    []
  );

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(progressRef.current, {
      t: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });

    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [progressRef]);

  useFrame((_, delta) => {
    const t = THREE.MathUtils.clamp(progressRef.current.t, 0, 1);
    position.copy(cameraPath.getPoint(t));
    lookAt.copy(targetPath.getPoint(t));

    const driftStrength = isMobile ? 0.04 : 0.18;
    position.x += progressRef.current.mouseX * driftStrength;
    position.y += -progressRef.current.mouseY * driftStrength * 0.6;
    lookAt.x += progressRef.current.mouseX * driftStrength * 0.35;
    lookAt.y += -progressRef.current.mouseY * driftStrength * 0.2;

    const smoothing = 1 - Math.pow(0.001, delta);
    camera.position.lerp(position, smoothing);
    camera.lookAt(lookAt);
  });

  return null;
}

function Starfield({ progressRef, count }: { progressRef: ProgressRef; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color(theme.blue), new THREE.Color(theme.violet), new THREE.Color(theme.cyan)];

    for (let index = 0; index < count; index += 1) {
      const radius = 24 + Math.random() * 38;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.58;
      positions[index * 3 + 2] = radius * Math.cos(phi) - 8;

      const color = palette[index % palette.length].clone().lerp(new THREE.Color("#ffffff"), Math.random() * 0.45);
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return bufferGeometry;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.006 + progressRef.current.t * 0.18;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.015;
    const material = ref.current.material as THREE.PointsMaterial;
    material.opacity = 0.52 + Math.sin(clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.58}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Planet({ progressRef }: { progressRef: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const atmosphereUniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color(theme.blue) }
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.055 + progressRef.current.t * 0.9;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.12) * 0.035;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1.45, 72, 72]} />
        <meshStandardMaterial
          color="#101d42"
          emissive={theme.blue}
          emissiveIntensity={0.22}
          roughness={0.84}
          metalness={0.08}
        />
      </mesh>
      <mesh rotation={[0.26, 0, -0.32]}>
        <torusGeometry args={[1.82, 0.012, 16, 180]} />
        <meshBasicMaterial color={theme.cyan} transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh scale={1.1}>
        <sphereGeometry args={[1.48, 72, 72]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          uniforms={atmosphereUniforms}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 glowColor;
            varying vec3 vNormal;
            void main() {
              float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.35);
              gl_FragColor = vec4(glowColor, clamp(rim, 0.0, 1.0) * 0.48);
            }
          `}
        />
      </mesh>
    </group>
  );
}

function MoonSatellite() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.18;
    group.current.position.y = 0.72 + Math.sin(clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={group} position={[-3.35, 0.72, -1.35]}>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#c7d2fe" emissive={theme.violet} emissiveIntensity={0.26} roughness={0.7} />
      </mesh>
      <mesh rotation={[1.08, 0.2, 0.35]}>
        <torusGeometry args={[0.72, 0.006, 10, 96]} />
        <meshBasicMaterial color={theme.violet} transparent opacity={0.36} />
      </mesh>
      <mesh position={[0.92, 0.08, 0]} rotation={[0.2, 0.5, 0.4]}>
        <boxGeometry args={[0.18, 0.08, 0.08]} />
        <meshStandardMaterial color={theme.cyan} emissive={theme.cyan} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function ProjectBelt({ progressRef, isMobile }: { progressRef: ProgressRef; isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const asteroidCount = isMobile ? 22 : 48;
  const asteroids = useMemo(
    () =>
      Array.from({ length: asteroidCount }, (_, index) => {
        const angle = (index / asteroidCount) * Math.PI * 2;
        const radius = 1.4 + Math.random() * 1.9;
        return {
          position: [Math.cos(angle) * radius, THREE.MathUtils.randFloatSpread(1.2), -7.1 + Math.sin(angle) * 0.9] as [number, number, number],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
          scale: 0.08 + Math.random() * 0.18
        };
      }),
    [asteroidCount]
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.08 + progressRef.current.t * 1.4;
  });

  return (
    <group ref={group} position={[0, 0, -7.1]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.006, 8, 160]} />
        <meshBasicMaterial color={theme.blue} transparent opacity={0.18} />
      </mesh>
      {asteroids.map((asteroid, index) => (
        <mesh
          key={`asteroid-${index}`}
          position={[asteroid.position[0], asteroid.position[1], asteroid.position[2] + 7.1]}
          rotation={asteroid.rotation}
          scale={asteroid.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#20283a" roughness={0.92} metalness={0.04} />
        </mesh>
      ))}
      {projectNodes.map((node, index) => {
        const angle = (index / projectNodes.length) * Math.PI * 2 + 0.28;
        return (
          <ProjectNode
            key={node.label}
            label={node.label}
            color={node.color}
            index={index}
            progressRef={progressRef}
            position={[Math.cos(angle) * 2.45, 0.15 + index * 0.18, Math.sin(angle) * 1.05]}
          />
        );
      })}
    </group>
  );
}

function ProjectNode({
  label,
  color,
  index,
  progressRef,
  position
}: {
  label: string;
  color: string;
  index: number;
  progressRef: ProgressRef;
  position: [number, number, number];
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const inProjects = progressRef.current.t > 0.34 && progressRef.current.t < 0.62;
    const pulse = 0.95 + Math.sin(clock.elapsedTime * 2.2 + index) * 0.1;
    if (mesh.current) mesh.current.scale.setScalar(inProjects ? 1.2 * pulse : 0.82);
    if (material.current) material.current.emissiveIntensity = inProjects ? 1.35 : 0.32;
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial ref={material} color={color} emissive={color} emissiveIntensity={0.55} />
      </mesh>
      <Text
        position={[0, -0.38, 0]}
        fontSize={0.14}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.003}
        outlineColor={theme.void}
      >
        {label}
      </Text>
    </group>
  );
}

function SkillsNebula({ progressRef, count }: { progressRef: ProgressRef; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color(theme.blue), new THREE.Color(theme.violet), new THREE.Color(theme.cyan), new THREE.Color(theme.green)];

    for (let index = 0; index < count; index += 1) {
      const radius = Math.pow(Math.random(), 0.62) * 3.2;
      const angle = Math.random() * Math.PI * 2;
      positions[index * 3] = Math.cos(angle) * radius + THREE.MathUtils.randFloatSpread(0.45);
      positions[index * 3 + 1] = THREE.MathUtils.randFloatSpread(2.1);
      positions[index * 3 + 2] = Math.sin(angle) * radius * 0.72 + THREE.MathUtils.randFloatSpread(0.45);

      const color = palette[index % palette.length];
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return bufferGeometry;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const inSkills = progressRef.current.t > 0.56 && progressRef.current.t < 0.78;
    ref.current.rotation.y = clock.elapsedTime * 0.04;
    const material = ref.current.material as THREE.PointsMaterial;
    material.opacity = inSkills ? 0.72 : 0.28;
  });

  return (
    <group position={[5.2, 0.1, -12]}>
      <points ref={ref} geometry={geometry}>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.32}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh>
        <sphereGeometry args={[2.2, 36, 36]} />
        <meshBasicMaterial color={theme.violet} transparent opacity={0.045} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SignalBeacon() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.28;
    group.current.position.y = -0.3 + Math.sin(clock.elapsedTime * 1.2) * 0.06;
  });

  return (
    <group ref={group} position={[0, -0.3, -18.6]}>
      <pointLight color={theme.green} intensity={2.5} distance={7} />
      <mesh>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshStandardMaterial color={theme.green} emissive={theme.green} emissiveIntensity={1.1} />
      </mesh>
      {[0.55, 0.92, 1.28].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.006, 8, 96]} />
          <meshBasicMaterial color={theme.green} transparent opacity={0.28 - index * 0.055} />
        </mesh>
      ))}
      <mesh position={[-0.72, 0.12, 0.15]} rotation={[0.2, 0.1, -0.8]}>
        <coneGeometry args={[0.12, 1.3, 24]} />
        <meshBasicMaterial color={theme.cyan} transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
