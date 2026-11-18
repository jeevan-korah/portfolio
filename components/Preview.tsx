import Image from "next/image";
import type { PreviewKind, Project } from "@/lib/data";

// A project's card image: its real screenshot if it has one, otherwise the drawn preview.
export function Cover({ project }: { project: Project }) {
  if (project.cover) {
    return (
      <Image
        src={project.cover}
        alt={`${project.title} screenshot`}
        fill
        sizes="(max-width: 560px) 100vw, 600px"
        style={{ objectFit: "cover", objectPosition: "top left" }}
      />
    );
  }
  return <Preview kind={project.preview} />;
}

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="win">
      <div className="wbar">
        <i /><i /><i />
        <em>{title}</em>
      </div>
      <div className="wbody">{children}</div>
    </div>
  );
}

function DataPilot() {
  return (
    <Window title="datapilot-ai">
      <div className="bubble">Which 3 customers spent the most last quarter?</div>
      <div className="split">
        <div className="stack">
          <span className="ok">✓ schema context loaded · 14 tables sampled</span>
          <div className="code">
            <b>SELECT</b> c.name, <b>SUM</b>(o.total) <b>AS</b> spent<br />
            <b>FROM</b> customers c <b>JOIN</b> orders o …<br />
            <b>GROUP BY</b> c.name <b>ORDER BY</b> spent <b>DESC LIMIT</b> 3;
          </div>
          <span className="ok">✓ read-only check passed</span>
          <div>
            <div className="trow"><span>Kerala Traders</span><span>₹4,82,300</span></div>
            <div className="trow"><span>Malabar Foods</span><span>₹3,97,150</span></div>
            <div className="trow"><span>Periyar Textiles</span><span>₹2,64,900</span></div>
          </div>
        </div>
        <div className="bars">
          <i style={{ height: "92%" }} /><i style={{ height: "74%" }} /><i style={{ height: "52%" }} /><i style={{ height: "38%" }} />
        </div>
      </div>
    </Window>
  );
}

function ImpactProof() {
  const rows = [
    { k: "p99 latency", w: 90, v: "94ms ✓" },
    { k: "Lighthouse", w: 96, v: "96 ✓" },
    { k: "model accuracy", w: 58, v: "0.81 ✗", fail: true },
    { k: "proposal score", w: 84, v: "84% ✓" },
  ];
  return (
    <Window title="impact ledger">
      <div className="center">
        {rows.map((r) => (
          <div key={r.k} className={`meter${r.fail ? " x" : ""}`}>
            <span>{r.k}</span>
            <span className="m"><i style={{ width: `${r.w}%` }} /></span>
            <span className="v">{r.v}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}

function SmartFill() {
  const slots = [
    { t: "9:00", p: "Cleaning · Dr. Rao" },
    { t: "10:00", p: "Crown prep · Dr. Rao" },
    { t: "11:00", gap: true },
    { t: "12:00", p: "Check-up · Dr. Rao" },
  ];
  return (
    <Window title="scheduler · smart fill">
      <div className="sf">
        <div className="cal">
          {slots.map((s) =>
            s.gap ? (
              <div key={s.t} className="slot gap"><span>{s.t}</span><b>Open slot · 60 min · cancelled</b></div>
            ) : (
              <div key={s.t} className="slot"><span>{s.t}</span>{s.p}</div>
            ),
          )}
        </div>
        <div className="mlist">
          <span className="ok">✓ 3 patients match provider, procedure and duration</span>
          <div className="r"><div><b>A. Menon</b> <span>· reschedule queue</span></div><span className="tagsm">SMS sent</span></div>
          <div className="r"><div><b>R. Thomas</b> <span>· short-call list</span></div><span className="wa">Booked ✓</span></div>
          <div className="r dim"><div><b>S. Nair</b> <span>· next batch</span></div><span className="tagsm">waiting</span></div>
        </div>
      </div>
      <div className="sfstatus">
        <span>11:00 slot filled</span>
        <span>✓ one offer per patient</span>
        <span>✓ no double-booking</span>
      </div>
    </Window>
  );
}

function Proctor() {
  return (
    <Window title="interview call">
      <div className="vid">
        <div className="vt"><div className="heat" /><span className="flag">gaze off-screen</span><small>candidate · heatmap</small></div>
        <div className="vt two"><small>interviewer</small></div>
      </div>
    </Window>
  );
}

export default function Preview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "smartfill":
      return <SmartFill />;
    case "datapilot":
      return <DataPilot />;
    case "impactproof":
      return <ImpactProof />;
    case "fhc":
      return (
        <Image
          src="/fhc/dashboard.webp"
          alt="FHC Portal dashboard with upcoming events, projects and leaderboard tabs"
          fill
          sizes="(max-width: 560px) 100vw, 600px"
          style={{ objectFit: "cover", objectPosition: "top left" }}
        />
      );
    case "proctor":
      return <Proctor />;
    case "homelab":
      return (
        <Image
          src="/homelab/proxmox-dashboard.jpg"
          alt="Proxmox dashboard showing the Ubuntu VM that runs the homelab"
          fill
          sizes="(max-width: 560px) 100vw, 600px"
          style={{ objectFit: "cover", objectPosition: "top left" }}
        />
      );
  }
}
