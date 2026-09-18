import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { useT } from "../i18n";
import { Container, Wavy } from "../components/ui";

export default function NotFound() {
  const t = useT();
  const p = t.notFound;

  return (
    <main className="relative flex min-h-[80vh] items-center overflow-hidden bg-cream bg-grid">
      <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-clay/10 blur-3xl" />
      <Container className="relative py-32 text-center">
        <Compass className="mx-auto h-10 w-10 text-clay" strokeWidth={1.5} />
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-fog">{p.tag}</p>
        <h1 className="display mx-auto mt-4 max-w-2xl text-4xl font-medium tracking-tight text-ink md:text-6xl">
          {p.titleA} <em className="text-clay"><Wavy text={p.titleB} /></em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-smoke">{p.lede}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary group">
            {p.back}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
          </Link>
          <Link to="/contact" className="btn-ghost">
            {p.contact}
          </Link>
        </div>
      </Container>
    </main>
  );
}
