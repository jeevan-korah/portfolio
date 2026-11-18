import Image from "next/image";
import Link from "next/link";
import { Cover } from "@/components/Preview";
import { profile, projects, smallBuilds, timeline, scrapbook } from "@/lib/data";

export default function Home() {
  return (
    <>
      <header>
        <div className="who">
          <div className="avatar">
            <Image src="/profile.webp" alt={profile.name} fill sizes="44px" priority style={{ objectFit: "cover" }} />
          </div>
          <div>
            <b>{profile.name}</b>
            <span>{profile.headline}</span>
          </div>
        </div>

        <p className="lead">
          <em>Building AI products people can trust.</em> Most recently I designed and shipped
          <span className="circled">
            Smart Fill
            <svg className="ring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
              <ellipse cx="50" cy="20" rx="48" ry="18" pathLength="100" />
            </svg>
          </span>to production at CareStack, end to end, from architecture to
          release.
        </p>
        <p className="sub">
          Final-year CS student in Kerala.{" "}
          <span className="anno">
            <span className="hand">₹25k prize ↓</span>
            <b className="u">2nd at a national hackathon</b>
          </span>
          , and I built a club platform used by 500+ students.
        </p>
        <div className="meta">
          <span><span className="dot" />{profile.location}</span>
          <span>·</span>
          <a className="u" href={profile.resume} target="_blank" rel="noopener">résumé ↓</a>
          <span>·</span>
          <a className="u" href="#say-hi">say hi ↓</a>
        </div>

        <div className="box">
          <div className="stats">
            <div><b>500+</b><span>users on the FHC Portal</span></div>
            <div><b>60+</b><span>students mentored in MERN</span></div>
            <div><b>4</b><span>hackathon podiums</span></div>
          </div>
          <div className="talk">
            <span>Open to full-time roles in AI and full-stack.</span>
            <div className="btns">
              <a className="btn dark" href={`mailto:${profile.email}`}>✉ Send an email</a>
              <a className="btn" href={profile.resume} target="_blank" rel="noopener">Résumé</a>
            </div>
          </div>
        </div>
      </header>

      <section id="work">
        <h2>things i&apos;ve built.</h2>
        <div className="projects">
          {projects.map((p) => (
            <div key={p.slug} className={`proj${p.wide ? " wide" : ""}`}>
              <Link href={`/work/${p.slug}`} className={`paper ${p.color}`} aria-label={`${p.title} case study`}>
                <span className="tape" />
                <div className="shot"><Cover project={p} /></div>
              </Link>
              <div className="pinfo">
                <div className="ptitle"><b>{p.title}{p.tag && <span className="ptag">{p.tag}</span>}</b><span>{p.year}</span></div>
                <p>{p.blurb}</p>
                <span className="hand">{p.note}</span>
                <div className="plinks">
                  <Link className="u" href={`/work/${p.slug}`}>case study</Link>
                  {p.links.map((l) => (
                    <a key={l.href} className="u" href={l.href} target="_blank" rel="noopener">{l.label} <span className="arr">↗</span></a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="also">Also built:</p>
        <div className="small">
          {smallBuilds.map((s) => {
            const inner = (
              <>
                <b>{s.title}</b>
                <span>{s.blurb}</span>
                <em>{s.meta}</em>
              </>
            );
            return s.href ? (
              <a key={s.title} href={s.href} target="_blank" rel="noopener">{inner}</a>
            ) : (
              <div key={s.title}>{inner}</div>
            );
          })}
        </div>
      </section>

      <section id="experience">
        <h2>where i&apos;ve been.</h2>
        <div className="tl">
          {timeline.map((t) => (
            <div key={t.org} className="row">
              <span className="yr">{t.years}</span>
              <div>
                <b>{t.org}</b>
                {t.current && <span className="live" />}
                <div className="role">{t.role}</div>
                {t.desc && <div className="desc">{t.desc}</div>}
                {t.stack && <div className="stackline">{t.stack}</div>}
              </div>
            </div>
          ))}
        </div>
        <p className="fun"><b>Fun fact:</b> I broke my own home server, then rebuilt it so it can&apos;t lose data again.</p>
      </section>

      <section>
        <h2>scrapbook.</h2>
        <div className="scrap">
          {scrapbook.map((s) => (
            <figure key={s.caption} className="polar">
              <span className="tape" />
              <div className="ph">
                {s.video ? (
                  <video
                    src={s.video}
                    poster={s.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={s.caption}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : s.src ? (
                  <Image src={s.src} alt={s.caption} fill sizes="200px" style={{ objectFit: "cover", objectPosition: s.focus ?? "left top" }} />
                ) : (
                  s.placeholder
                )}
              </div>
              <figcaption className="cap">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="hi" id="say-hi">
        <h2>say hi.</h2>
        <p>
          Email is best: <a className="u" href={`mailto:${profile.email}`}>{profile.email}</a>. I&apos;m also on{" "}
          <a className="u" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a> and{" "}
          <a className="u" href={profile.github} target="_blank" rel="noopener">GitHub</a>.
        </p>
      </section>

      <footer>
        <span>last updated Nov 2026</span>
        <span>{profile.location}</span>
      </footer>
    </>
  );
}
