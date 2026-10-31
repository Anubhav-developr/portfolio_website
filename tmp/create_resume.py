from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUTPUT = r"F:\codexproject\portfolio_website\Anubhav_Mishra_Resume.pdf"
PAGE_W, PAGE_H = A4
NAVY = colors.HexColor("#10213F")
BLUE = colors.HexColor("#4969D6")
CYAN = colors.HexColor("#168BB8")
INK = colors.HexColor("#182230")
MUTED = colors.HexColor("#526173")
LINE = colors.HexColor("#D9E2F0")
PALE = colors.HexColor("#F3F7FC")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=25, leading=28, textColor=NAVY, spaceAfter=3))
styles.add(ParagraphStyle(name="Role", parent=styles["Normal"], fontName="Helvetica", fontSize=10.5, leading=14, textColor=BLUE, spaceAfter=5))
styles.add(ParagraphStyle(name="Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.3, leading=12, textColor=MUTED))
styles.add(ParagraphStyle(name="Section", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=NAVY, spaceBefore=8, spaceAfter=4, uppercase=True))
styles.add(ParagraphStyle(name="Body", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=12, textColor=INK, spaceAfter=3))
styles.add(ParagraphStyle(name="Small", parent=styles["Normal"], fontName="Helvetica", fontSize=7.8, leading=10.3, textColor=MUTED))
styles.add(ParagraphStyle(name="Project", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.7, leading=11, textColor=INK, spaceAfter=1))
styles.add(ParagraphStyle(name="ProjectText", parent=styles["Normal"], fontName="Helvetica", fontSize=7.7, leading=10, textColor=INK, spaceAfter=1))


def P(text, style="Body"):
    return Paragraph(text, styles[style])


def section(title):
    return [P(title, "Section"), Table([['']], colWidths=[174 * mm], rowHeights=[0.7 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), BLUE), ("LINEBELOW", (0, 0), (-1, -1), 0, BLUE)])), Spacer(1, 2)]


def project(name, tech, description):
    return KeepTogether([P(f"{name} <font color='#4969D6'>|</font> {tech}", "Project"), P(description, "ProjectText")])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, 13 * mm, PAGE_W - 18 * mm, 13 * mm)
    canvas.setFont("Helvetica", 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8 * mm, "Anubhav Mishra | Full Stack Developer | Android Engineer")
    canvas.drawRightString(PAGE_W - 18 * mm, 8 * mm, f"Page {doc.page}")
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    rightMargin=18 * mm,
    leftMargin=18 * mm,
    topMargin=15 * mm,
    bottomMargin=18 * mm,
    title="Anubhav Mishra Resume",
    author="Anubhav Mishra",
    subject="ATS-friendly software engineering resume",
)

story = []
story.append(P("Anubhav Mishra", "Name"))
story.append(P("Full Stack Developer | Android Engineer | Computer Science Graduate", "Role"))
story.append(P("Shahjahanpur, Uttar Pradesh, India &nbsp;|&nbsp; anubhavm1234@gmail.com &nbsp;|&nbsp; +91 (available on request)", "Contact"))
story.append(P("GitHub: github.com/Anubhav-developr &nbsp;|&nbsp; LinkedIn: linkedin.com/in/anubhav-mishra &nbsp;|&nbsp; Portfolio: portfolio-website-anubhavdeveloprs-projects.vercel.app", "Contact"))
story.append(Spacer(1, 5))

story += section("Professional Summary")
story.append(P("Results-driven B.Tech Computer Science and Engineering graduate with hands-on experience building Android applications, full-stack web products, Firebase-backed systems, machine learning experiments, and developer utilities. Strong foundation in Java, JavaScript, TypeScript, Python, clean architecture, responsive UX, databases, APIs, and algorithmic problem solving. Currently serving as a Gramin Dak Sevak while shipping practical software projects with a focus on reliability, clarity, and user value."))

story += section("Experience")
story.append(P("Gramin Dak Sevak (GDS) | Department of Posts, India Post | Feb 2024 - Present", "Project"))
story.append(P("Manage daily postal operations, customer service, financial services, savings-account workflows, and citizen-facing processes in Shahjahanpur. Apply operational accuracy, record discipline, and customer communication in a public-service environment.", "Body"))
story.append(P("Freelance Android and Web Developer | Independent / Remote | 2022 - Present", "Project"))
story.append(P("Design and develop Android and web applications from concept through deployment-ready delivery, with practical experience in clean architecture, responsive interfaces, Firebase ecosystems, local persistence, APIs, and product-focused UX.", "Body"))

story += section("Education and Achievements")
story.append(P("B.Tech - Computer Science and Engineering | Rajkiya Engineering College Sonbhadra (REC Sonbhadra) | 2023", "Project"))
story.append(P("CodeChef Global Rank 24 | April Long Two 2022, Division 4 rated contest", "Body"))
story.append(P("Government Service | Secured Gramin Dak Sevak role at the Department of Posts in February 2024", "Body"))

story += section("Technical Skills")
skills = [
    ("Languages", "Java, JavaScript, TypeScript, HTML5, CSS3, Python, C++"),
    ("Frameworks and Platforms", "React, React Native, Next.js, Android SDK, Node.js, Tailwind CSS"),
    ("Data and Backend", "Firebase Realtime Database, Cloud Firestore, SQLite, Room, MySQL, REST APIs"),
    ("Architecture and Tools", "MVVM, Hilt Dependency Injection, WorkManager, WebSockets, Git, GitHub, Android Studio, VS Code, Jupyter Notebook"),
    ("Computer Science", "Compiler Design, Lexical Analysis, Parsing, AST, Minimax AI, Alpha-Beta Pruning, Machine Learning Regression"),
]
for label, value in skills:
    story.append(P(f"<b>{label}:</b> {value}", "Body"))

story += section("Selected Projects")
projects_page_1 = [
    ("PostPath", "JavaScript, HTML, CSS, Web UX", "Postal workflow project focused on clearer service journeys, practical information, and accessible public-service interactions."),
    ("System Health Monitor", "Node.js, JavaScript, CPU and Memory Metrics", "Runtime observability utility that tracks CPU and memory health, configurable thresholds, sampling, and overload conditions."),
    ("JEE to IIT", "JavaScript, HTML, CSS, Education UX", "Exam-preparation platform that helps JEE aspirants structure preparation, discover guidance, and stay oriented toward IIT goals."),
    ("JEE to IIT App", "Android, Java, Mobile UI", "Mobile learning companion designed for focused access to preparation content, readable study flows, and repeatable sessions."),
    ("DigiPin Explorer", "JavaScript, Maps, Geolocation", "Interactive exploration of India's DigiPin digital-addressing concept through location grids, map-oriented UX, and precise discovery."),
    ("House Price Predictor ML", "Python, Pandas, Scikit-learn, Regression", "Applied machine-learning workflow covering housing features, tabular data preparation, regression training, and price prediction."),
    ("ExamPulse", "Java, Android, MVVM, Room, Hilt, WorkManager", "Production-ready offline-first Android quiz and exam-preparation app with analytics, background sync, and Lottie animations."),
    ("Post Office Account Management System", "Python, MySQL, Tkinter", "Finance application for deposits, customer records, balances, transaction history, account ledger flows, and reporting."),
]
for item in projects_page_1:
    story.append(project(*item))

story.append(PageBreak())
story.append(P("Anubhav Mishra", "Name"))
story.append(P("Selected Projects and Engineering Portfolio", "Role"))
story.append(P("Continued project work | github.com/Anubhav-developr", "Contact"))
story += section("Selected Projects - Continued")
projects_page_2 = [
    ("Tic-Tac-Toe Minimax AI", "Python, C++, Minimax, Alpha-Beta Pruning", "AI-powered game exploring adversarial search trees, pruning efficiency, evaluation heuristics, and strategic move selection."),
    ("Custom Language Interpreter", "C++, Lexer, Parser, AST", "Compiler-design project covering tokenization, grammar handling, AST construction, and execution-ready interpreter structure."),
    ("ClipboardMig", "Android, Chrome Extension, Firebase, JavaScript", "Real-time phone-to-PC clipboard synchronization connecting mobile and browser clients through a Firebase-backed pipeline."),
    ("Invofly", "React Native, PDF Export, Local Storage", "Cross-platform invoice generator with local persistence, multi-currency support, PDF export, and seamless sharing."),
    ("OrbitCast Nova Lite", "Android, NASA API, ISRO API, PDF Generation", "Weather and satellite application combining live space content, multi-day forecasts, satellite imagery, and on-device reports."),
    ("PeacePages", "Java, MVVM, Firebase, Firestore, Room", "Mindfulness and journaling app with Firebase authentication, Firestore sync, offline Room caching, and daily reflection flows."),
    ("Premium Portfolio Website", "Next.js, TypeScript, Tailwind CSS, Framer Motion", "Cinematic portfolio with responsive motion, project-specific visual systems, theme switching, performance-focused loading, and accessible navigation."),
    ("CofWah - COVID-19 Awareness Platform", "Next.js, TypeScript, Tailwind CSS, CoWIN API", "Hindi-first public-health platform for myth-busting, verified healthcare information, safety practices, and vaccination resource discovery."),
    ("REC Sonbhadra - Official College Website", "Next.js, TypeScript, Tailwind CSS", "Contribution to a public-facing institutional platform covering academic information, departments, notices, facilities, and placement content."),
    ("CocamS-K - Browser Camera Toolkit", "HTML, CSS, JavaScript, WebRTC, File API", "Browser media experiment exploring webcam access, screen capture, recording workflows, and native media APIs."),
    ("PIXEy-EDITOR - Browser Pixel Art Editor", "JavaScript, HTML5 Canvas API, CSS", "Canvas-based creative tool with freehand drawing, rectangle, fill, color-pick, undo history, and image import/export."),
    ("CodeChef User Finder", "HTML, CSS, JavaScript", "Lightweight client-side utility that routes a CodeChef handle directly to the matching profile page."),
]
for item in projects_page_2:
    story.append(project(*item))

story += section("Professional Links")
story.append(P("GitHub: https://github.com/Anubhav-developr", "Body"))
story.append(P("Portfolio: https://portfolio-website-anubhavdeveloprs-projects.vercel.app", "Body"))
story.append(P("CodeChef: https://www.codechef.com/users/anubhav_258", "Body"))
story.append(P("LinkedIn: https://www.linkedin.com/in/anubhav-mishra-51b751141/", "Body"))

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)
