import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import SplitText from "../ui/SplitText";
import { profile } from "../../data/site";

export default function Contact() {
  return (
    <section
      id="contato"
      className="panel panel-dark gutter relative z-10 py-24 md:py-32"
    >
      <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-4">
        <h2 className="type-mono">Contato</h2>
        <span className="type-mono text-[var(--fg-soft)]">{profile.availability}</span>
      </div>

      <div className="mt-8 overflow-hidden md:mt-10">
        <h3 className="type-mega text-[var(--fg)]">
          <SplitText text="Vamos conversar" inView justify="start" stagger={0.03} duration={1.1} />
        </h3>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <Magnetic className="inline-block">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="group inline-block max-w-full"
          >
            <span className="type-headline block break-all transition-colors duration-300 group-hover:text-accent">
              {profile.email}
            </span>
            {/* fio embaixo do e-mail, recolhe no hover */}
            <span className="mt-3 block h-px w-full origin-left bg-[var(--line)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0 motion-reduce:transition-none" />
          </a>
        </Magnetic>
      </Reveal>
    </section>
  );
}
