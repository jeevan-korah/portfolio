// All site content lives here. Edit this file to change text, links or projects.

export const profile = {
  name: "Jeevan Biju Korah",
  headline: "Product Engineer Intern at CareStack · CS at FISAT",
  location: "Kochi, India",
  email: "jeevanbijukorah@gmail.com",
  linkedin: "https://www.linkedin.com/in/jeevanbijukorah/",
  github: "https://github.com/jeevan-korah",
  resume: "/resume.pdf",
};

export type NoteColor = "y" | "p" | "b" | "g" | "l";
export type PreviewKind = "smartfill" | "datapilot" | "impactproof" | "fhc" | "homelab" | "proctor";

export type CaseSection = { heading: string; body?: string; points?: string[] };

export type Project = {
  slug: string;
  title: string;
  year: string;
  color: NoteColor;
  preview: PreviewKind;
  wide?: boolean;
  tag?: string; // small label next to the title, e.g. "internship"
  blurb: string;
  note: string; // the handwritten line under the card
  tagline: string; // one line at the top of the case study
  stack: string[];
  links: { label: string; href: string }[];
  sections: CaseSection[];
  cover?: string; // real screenshot used instead of the drawn preview
  gallery?: { src: string; caption: string }[]; // screenshots shown on the case study
};

export const projects: Project[] = [
  {
    slug: "smart-fill",
    title: "Smart Fill",
    year: "2026",
    color: "b",
    preview: "smartfill",
    wide: true,
    tag: "internship · CareStack",
    blurb:
      "Turns cancelled dental appointments into booked ones automatically. Designed, built and shipped to production, end to end.",
    note: "my feature, from architecture to production",
    tagline: "When a patient cancels, the clinic loses that slot. Smart Fill finds the right patient and books them, without staff picking up the phone.",
    stack: ["Angular", ".NET 8", "C#", "MySQL", "Kafka (CDC)", "SMS"],
    links: [],
    gallery: [
      { src: "/smartfill/scheduler.jpg", caption: "The CareStack scheduler. A cancellation leaves a gap like the empty columns here." },
      { src: "/smartfill/settings.jpg", caption: "Smart Fill settings: which slots to fill, batch size, wait time between batches, message caps and locations." },
      { src: "/smartfill/matching.jpg", caption: "Patients matched to an open slot, pulled from the short-call list and the reschedule queue." },
      { src: "/smartfill/booking.jpg", caption: "What the patient sees after tapping the SMS link: book it, confirmed, or already filled by someone else." },
    ],
    sections: [
      {
        heading: "the problem",
        body: "A cancellation leaves a gap in a dentist's schedule, and an empty chair is lost revenue. Filling it was manual: staff searched the reschedule queue and short-call list, checked each patient against the provider, procedure type and duration, then phoned people one at a time until someone said yes.",
      },
      {
        heading: "my role",
        body: "The feature was assigned to me during my internship at CareStack, a dental practice-management platform. I designed the architecture and took it through several review rounds until it was signed off, then built the Angular frontend and the .NET / C# backend, and took it through testing, QA and release to production.",
      },
      {
        heading: "how it works",
        points: [
          "Find gaps: open slots are detected as soon as the calendar changes.",
          "Match and rank: eligible patients are matched on provider, procedure type and duration, then ranked.",
          "Contact: patients are texted in batches with a booking link, respecting opt-outs and frequency caps.",
          "Book: the first patient to confirm gets the slot. If only part of the slot is filled, the rest goes back into the loop.",
        ],
      },
      {
        heading: "key decisions",
        points: [
          "Slot-first design: the open slot is the unit of work, and each slot runs its own small outreach campaign.",
          "Event-driven sync: Kafka change-data-capture keeps local read models of patients and appointments current, so matching never puts load on the main database.",
          "No double-booking: an atomic claim stops two offers going to one patient, and optimistic concurrency stops two patients booking one slot.",
          "Restart-safe scheduling: each slot stores when its next message round is due, so there's no in-memory state and a restarted worker simply carries on.",
        ],
      },
      {
        heading: "the hard part",
        body: "Edge cases across services: appointments, patients, procedure types and providers all live in different places, and each one can change while a campaign is running. Most of the design reviews were about those cases, not the happy path.",
      },
    ],
  },
  {
    slug: "datapilot-ai",
    title: "DataPilot AI",
    year: "2026",
    color: "y",
    preview: "datapilot",
    wide: true,
    blurb:
      "Ask your company database questions in plain English. Schema-aware RAG with read-only guardrails.",
    note: "answers in under 5 seconds, multi-tenant",
    tagline: "Non-technical teams ask their database questions in plain English and get back the SQL and the answer.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Groq LLM", "Docker", "AWS"],
    links: [
      { label: "live demo", href: "https://datapilot-ai-theta.vercel.app/" },
      { label: "code", href: "https://github.com/jeevan-korah/datapilot-ai" },
    ],
    gallery: [
      { src: "/datapilot/architecture.png", caption: "System architecture: React frontend, Express API, prompt engineering and SQL validation layers, and the Schema Intelligence Engine, the RAG pipeline that profiles each database." },
      { src: "/datapilot/employee-query.jpg", caption: "Employee view: ask a question about the company database in plain English, with past questions kept in history." },
      { src: "/datapilot/admin-connection.jpg", caption: "Admin view: connect a PostgreSQL database and DataPilot detects its tables and foreign keys automatically." },
      { src: "/datapilot/database-explorer.jpg", caption: "Database explorer: browse the tables DataPilot found in the connected database." },
      { src: "/datapilot/data-model.png", caption: "DataPilot's own data model: companies, users, roles with per-table permissions, query requests and the SQL generated for each." },
    ],
    sections: [
      {
        heading: "the problem",
        body: "Most people in a business can't write SQL, so every data question becomes a ticket for someone who can. Plain LLM text-to-SQL breaks on real schemas: the model guesses table names, misreads columns and occasionally writes something dangerous.",
      },
      {
        heading: "how it works",
        points: [
          "An admin connects a company PostgreSQL database. The connection string is encrypted before it's stored.",
          "A background scan reads the schema and profiles the data: it estimates table sizes, samples rows, lists the distinct values of low-cardinality text columns and computes min / max / average for numbers.",
          "That profile becomes the context for the model, so it sees real values (for example, that status is one of 'paid', 'refunded', 'pending'), not just column names.",
          "Employees ask a question; the model writes SQL; the server checks it; the query runs; results come back as a table.",
        ],
      },
      {
        heading: "key decisions",
        points: [
          "Guardrails on output, not trust in the prompt: markdown fences are stripped, anything that isn't a single SELECT is rejected before it touches the database.",
          "When a question can't be answered from the schema, the model returns INVALID_SCHEMA and the user gets a clear 400 explaining why, not a confusing SQL error.",
          "Scans run asynchronously: the API answers 202 straight away, the client polls for status, and a second scan can't start while one is running (409).",
          "Multi-tenant from day one: companies, admins and employees, with role management and per-company connections.",
        ],
      },
      {
        heading: "results",
        body: "Typical questions are answered in under 5 seconds. A multi-step generation process cut the number of failed queries on multi-table questions.",
      },
    ],
  },
  {
    slug: "impactproof",
    title: "ImpactProof",
    year: "2026",
    color: "p",
    preview: "impactproof",
    blurb: "Hiring on proven impact. LLM-scored proposals and code benchmarked against real KPIs.",
    note: "2nd at CODEX National Hackathon",
    tagline: "If AI can write a portfolio and clear LeetCode, what still proves someone is a good engineer?",
    stack: ["React", "TypeScript", "Express 5", "Prisma", "PostgreSQL", "Claude / Ollama", "Lighthouse", "autocannon"],
    links: [{ label: "code", href: "https://github.com/jeevan-korah/impact-proof" }],
    cover: "/impactproof/challenge-editor.webp",
    gallery: [
      { src: "/impactproof/challenge-dashboard.webp", caption: "Open challenges from real projects like Apache APISIX, Prometheus and NGINX, each with a KPI and a difficulty." },
      { src: "/impactproof/challenge-editor.webp", caption: "The in-browser editor: code on the left, a live Lighthouse score on the right." },
      { src: "/scrapbook/codex-whiteboard.webp", caption: "Where it started: whiteboarding the idea with the team at CODEX." },
    ],
    sections: [
      {
        heading: "the idea",
        body: "Built in 48 hours with a team of four at CODEX, TANTRA 2026, where it placed 2nd nationally and won ₹25,000. Companies post real KPI challenges, such as \"cut p99 latency from 320 ms to under 100 ms\". Engineers prove themselves by moving the number.",
      },
      {
        heading: "how it works",
        points: [
          "Proposal first: the engineer explains their diagnosis, and an LLM scores it against the company's checklist before any code is written.",
          "Shortlisted engineers submit a repo, which is benchmarked automatically against the challenge's real baseline, not a fixed answer key.",
          "Every result, pass or fail, goes into a public impact ledger that becomes the engineer's credibility profile.",
        ],
      },
      {
        heading: "key decisions",
        points: [
          "One test pipeline, three kinds of challenge: Lighthouse for frontend, autocannon load tests for backend, accuracy checks for ML. Results are normalised to target vs. baseline.",
          "LLM scoring is deterministic and defensive: temperature 0, JSON output, a 15-second timeout, and a mock fallback so the demo never dies when the model is down.",
          "Submissions are fingerprinted (SHA-256 over normalised source) to catch duplicates. In production I'd switch to MinHash or SimHash for fuzzy matching.",
        ],
      },
    ],
  },
  {
    slug: "fhc-portal",
    title: "FHC Portal",
    year: "2025",
    color: "b",
    preview: "fhc",
    blurb: "A complete club management platform: profiles, events, bootcamp sign-ups, team projects and an admin panel.",
    note: "used by 500+ students",
    tagline: "The platform that runs FISAT Horizon Club, with members, events, bootcamps, projects and certificates in one place.",
    stack: ["Next.js", "TypeScript", "Express", "MongoDB", "Mongoose", "JWT", "pdf-lib", "Nodemailer"],
    links: [{ label: "live", href: "https://fhc-portal-fe.vercel.app/" }],
    gallery: [
      { src: "/fhc/dashboard.webp", caption: "Student dashboard with upcoming events, active projects and a leaderboard." },
      { src: "/fhc/events.webp", caption: "Events with capacity tracking and registration. Past events include GENESIS 2025 and horizon.Hack()." },
      { src: "/fhc/byte.webp", caption: "BYTE bootcamp page: track progress, mentor, next class and community." },
    ],
    sections: [
      {
        heading: "why",
        body: "A student club with hundreds of members needs one place for everything: who's a member, what's coming up, who registered, who attended, and who gets a certificate. The portal replaced scattered forms and manual work with a single platform for students and organisers.",
      },
      {
        heading: "for students",
        points: [
          "Profile with skills, social links and a club membership ID.",
          "A dashboard with upcoming events, active projects and a leaderboard.",
          "Events, workshops and competitions they can browse and register for.",
          "BYTE bootcamp registration, with per-class attendance for each track.",
          "Projects: start your own, or send a request to join someone else's. The owner accepts or rejects requests.",
          "A community page, plus light and dark themes.",
        ],
      },
      {
        heading: "for admins",
        points: [
          "An admin panel to create and manage events, track capacity and mark attendance.",
          "Approve or reject proposed projects, and manage member roles.",
          "Verify bootcamp payments and track attendance class by class.",
          "Stats on member growth, upcoming events and recent attendance.",
          "Certificates generated on the server with pdf-lib: each name is drawn onto the event's template and emailed, to one person or a whole event in one click.",
        ],
      },
      {
        heading: "key decisions",
        points: [
          "One backend for every feature (events, bootcamp, projects), so membership and attendance data live in one place.",
          "Role-based access with JWT, so students and admins each see only what they should.",
        ],
      },
      {
        heading: "results",
        body: "500+ students use it for events, registrations and club activities, and it ran registrations and attendance for the 3-month BYTE 2.0 bootcamp.",
      },
    ],
  },
  {
    slug: "homelab",
    title: "Homelab",
    year: "2026",
    color: "g",
    preview: "homelab",
    blurb: "Self-hosted photo server, rebuilt after a failure so the data always survives. GPU passthrough and Tailscale.",
    note: "10–20× faster with the GPU",
    tagline: "A home server I broke, then rebuilt like a production system that can fail and recover cleanly.",
    stack: ["Proxmox VE", "Ubuntu", "Docker", "Immich", "NVIDIA GPU passthrough", "NFS", "Tailscale"],
    links: [{ label: "linkedin post", href: "https://www.linkedin.com/in/jeevanbijukorah/recent-activity/all/" }],
    gallery: [
      { src: "/homelab/proxmox-dashboard.jpg", caption: "The Ubuntu VM running on Proxmox VE." },
      { src: "/homelab/nvidia-smi-gpu.jpg", caption: "The GTX 1050 passed through to the VM, with Immich's machine-learning worker using it." },
      { src: "/homelab/btop-system-monitor.jpg", caption: "All four cores busy while Immich processes the library. Photos live on a separate data disk." },
    ],
    sections: [
      {
        heading: "why",
        body: "I kept running out of phone storage and didn't want another cloud subscription. I wanted to own my data and learn real infrastructure along the way.",
      },
      {
        heading: "the failure",
        body: "A configuration mistake broke the database and forced a hard reset. Instead of restoring and moving on, I rebuilt the server so the next failure wouldn't cost anything.",
      },
      {
        heading: "design decisions",
        points: [
          "Compute separated from storage: the VM is disposable and the data lives on NFS, so the VM can be rebuilt at any time without losing a photo.",
          "PCIe passthrough of a GTX 1050 (Q35 machine type, rombar=0) gives 10–20× faster photo processing, NVENC video transcoding and CUDA face and object recognition.",
          "Tailscale for access from anywhere, with no ports opened on the home router.",
          "Automated backups with retention.",
        ],
      },
      {
        heading: "what it taught me",
        body: "More about Linux, virtualisation, networking, GPU compute and backup and recovery than any tutorial that only shows the happy path.",
      },
    ],
  },
  {
    slug: "ai-interview-proctor",
    title: "AI Interview Proctor",
    year: "2024",
    color: "l",
    preview: "proctor",
    blurb: "A WebRTC interview call that tracks where the candidate is looking and flags likely cheating.",
    note: "computer vision + peer-to-peer",
    tagline: "A two-person interview call with real-time gaze tracking, cheating detection and a focus heatmap.",
    stack: ["JavaScript", "WebRTC", "Socket.IO", "Python", "OpenCV gaze tracking"],
    links: [{ label: "code", href: "https://github.com/jeevan-korah/interview-webrtc" }],
    gallery: [
      { src: "/proctor/call.webp", caption: "A live two-way call running over the local network (HTTPS, peer-to-peer WebRTC)." },
    ],
    sections: [
      {
        heading: "what it does",
        points: [
          "Peer-to-peer video call between interviewer and candidate over WebRTC, with Socket.IO for signalling.",
          "A Python gaze-tracking model watches the candidate's eyes and streams the data to the interviewer in real time.",
          "Patterns that look like reading from another screen are flagged, and a heatmap shows where the candidate focused.",
        ],
      },
      {
        heading: "what was hard",
        points: [
          "WebRTC is peer-to-peer, so more than two people needs a media server (an SFU) in the middle.",
          "The bridge between the Python model and the JavaScript app was the weakest link.",
          "Forced full-screen sharing caused enough bugs that I disabled it.",
        ],
      },
    ],
  },
];

export const smallBuilds = [
  { title: "Carbon Tracker", blurb: "Scan a grocery receipt and get its CO₂ footprint", meta: "AWS · 2026", href: "https://github.com/jeevan-korah/carbon-tracker" },
  { title: "ElevateX Scoreboard", blurb: "Live event scoreboard, updated in real time", meta: "Socket.IO · 2025", href: "https://github.com/jeevan-korah/elevatex-scoreboard" },
  { title: "Pedupikkal AI", blurb: 'A satirical Malayalam "AI doctor-astrologer"', meta: "LLM · 2026", href: "" },
];

export const timeline = [
  {
    years: "2026",
    org: "CareStack™ - Dental Practice Management",
    role: "Product Engineer Intern",
    desc: "Owned Smart Fill end to end, a feature that fills cancelled appointment slots automatically. Designed the architecture through several reviews, built the frontend and backend, and took it through QA to production.",
    stack: "Angular / .NET 8 / C# / MySQL / Kafka",
  },
  {
    years: "2024 – Present",
    org: "FISAT Horizon Club",
    role: "Development Lead",
    current: true,
    desc: "Built the FHC Portal for 500+ users. Led GENESIS '25, our first hackathon, for 200+ participants.",
    stack: "Next.js / Express / MongoDB",
  },
  { years: "2025", org: "BYTE 2.0", role: "MERN Track Mentor", desc: "Co-mentored 60+ students over a 3-month bootcamp." },
  { years: "2024 – Present", org: "ACM FISAT · TEDxFISAT", role: "Tech Team" },
  { years: "2023 – 2027", org: "FISAT", role: "B.Tech, Computer Science" },
  { years: "2024 – 2026", org: "Hackathons", role: "1st IGNITIA · 2nd CODEX National · 2nd Udyama" },
];

// focus = which part of the photo stays visible in the square crop
export const scrapbook: { caption: string; src?: string; video?: string; poster?: string; placeholder?: string; focus?: string }[] = [
  { caption: "2nd at Udyama 1.0", src: "/scrapbook/udyama-award.webp", focus: "66% 60%" },
  { caption: "teaching at BYTE 2.0", video: "/scrapbook/byte-teaching.mp4", poster: "/scrapbook/byte-teaching.jpg" },
  { caption: "whiteboarding at CODEX", src: "/scrapbook/codex-whiteboard.webp", focus: "45% 50%" },
  { caption: "pitching Life Lane", src: "/scrapbook/udyama-pitch.webp", focus: "40% 55%" },
  { caption: "GPU passthrough works!", src: "/homelab/nvidia-smi-gpu.jpg" },
  { caption: "4 cores, 100%", src: "/homelab/btop-system-monitor.jpg" },
];
