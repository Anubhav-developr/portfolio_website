import { AmbientStage } from "@/components/AmbientStage";
import { ContactSection } from "@/components/ContactSection";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { ProfileSection } from "@/components/ProfileSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StatsRibbon } from "@/components/StatsRibbon";
import { TimelineSection } from "@/components/TimelineSection";
import { MotionPreferenceProvider } from "@/context/MotionPreferenceContext";
import { identity, projects } from "@/constants/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: "Android Engineer",
    description: identity.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shahjahanpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "India"
    },
    knowsAbout: projects.flatMap((project) => project.tech)
  };

  return (
    <MotionPreferenceProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <CustomCursor />
      <AmbientStage />
      <Navigation />
      <main>
        <HeroSection />
        <StatsRibbon />
        <ProfileSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionPreferenceProvider>
  );
}
