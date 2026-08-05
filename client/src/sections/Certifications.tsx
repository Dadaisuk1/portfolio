import { certifications, type Certification } from "../data/resume";
import { useDevelopReveal } from "../hooks/useDevelopReveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { Aws } from "../components/icons/Aws";
import { Ibm } from "../components/icons/Ibm";
import { ArrowUpRight } from "../components/icons/ArrowUpRight";
import { ImageWithSkeleton } from "../components/ImageWithSkeleton";

const CARD_MAGNETIC_OFFSET = 6;

function CredentialIcon({ icon }: { icon: Certification["icon"] }) {
  if (icon === "aws") return <Aws className="h-7 w-auto text-ink" aria-hidden="true" />;
  if (icon === "ibm") return <Ibm className="h-6 w-auto" aria-hidden="true" />;
  return (
    <ImageWithSkeleton
      src="/assets/cit.png"
      alt=""
      width={33}
      height={32}
      className="object-left"
    />
  );
}

function CredentialCard({ cert }: { cert: Certification }) {
  const ref = useMagnetic<HTMLAnchorElement>(true, CARD_MAGNETIC_OFFSET);
  return (
    <a
      ref={ref}
      href={cert.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-4 rounded-md border border-ink/15 p-5 transition-colors hover:border-ink/30"
    >
      <div className="flex h-8 items-center">
        <CredentialIcon icon={cert.icon} />
      </div>
      <div className="flex flex-col gap-1">
        <p
          className="flex items-center gap-1 font-body leading-snug text-ink underline-offset-2 group-hover:underline"
          style={{ fontWeight: 580 }}
        >
          {cert.name}
          <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
        </p>
        <p className="font-hud text-tag uppercase tracking-[0.08em] text-ash-deep">
          {cert.type} · {cert.date}
        </p>
      </div>
    </a>
  );
}

export function Certifications() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id="certifications"
      className="paper-grain relative isolate border-t border-ink/10 bg-paper px-6 py-16 text-ink sm:px-14 sm:py-24"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-7">
        <div className="flex flex-col gap-2 border-b border-ink/12 pb-7">
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-orange">
            [04] Certifications &amp; Awards
          </span>
          <h2 className="font-display text-h2 text-ink" style={{ fontWeight: 580 }}>
            Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <CredentialCard key={cert.name} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
