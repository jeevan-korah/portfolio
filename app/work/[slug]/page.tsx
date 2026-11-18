import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Cover } from "@/components/Preview";
import { profile, projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} · ${profile.name}`, description: p.tagline } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      <Link className="back u" href="/#work">← all work</Link>

      <div className="cs-head">
        <h1>{p.title}</h1>
        <p className="tagline">{p.tagline}</p>
        <div className="cs-meta">
          <span className="chip">{p.year}</span>
          {p.tag && <span className="chip">{p.tag}</span>}
          {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
        </div>
        <div className="cs-links">
          {p.links.map((l) => (
            <a key={l.href} className="u" href={l.href} target="_blank" rel="noopener">{l.label} <span className="arr">↗</span></a>
          ))}
        </div>
      </div>

      <div className="cs-shot proj wide">
        <div className={`paper ${p.color}`}>
          <span className="tape" />
          <div className="shot"><Cover project={p} /></div>
        </div>
      </div>

      <div className="cs-body">
        {p.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}.</h2>
            {s.body && <p>{s.body}</p>}
            {s.points && <ul>{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>}
          </section>
        ))}
        {p.gallery && (
          <section>
            <h2>screens.</h2>
            <div className="gallery">
              {p.gallery.map((g) => (
                <figure key={g.src}>
                  <a href={g.src} target="_blank" rel="noopener" className="gimg">
                    <Image src={g.src} alt={g.caption} width={1600} height={1000} sizes="(max-width: 560px) 100vw, 600px" style={{ width: "100%", height: "auto" }} />
                  </a>
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="next">
        <Link className="u" href="/#work">← back home</Link>
        <Link className="u" href={`/work/${next.slug}`}>next: {next.title} <span className="arr r">→</span></Link>
      </div>
      <footer>
        <span>{profile.name}</span>
        <a className="u" href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </article>
  );
}
