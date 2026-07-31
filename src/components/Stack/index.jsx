import Reveal from "../ui/Reveal";
import { stack } from "../../data/site";

export default function Stack() {
  return (
    <section
      id="stack"
      className="gutter relative z-10 bg-paper pb-24 md:pb-32"
    >
      <div className="flex items-baseline justify-between border-b border-ink pb-4">
        <h2 className="type-mono">Stack</h2>
        <span className="type-mono text-ink/50">
          ({String(stack.reduce((n, g) => n + g.items.length, 0)).padStart(2, "0")})
        </span>
      </div>

      <div className="mt-10">
        {stack.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-3 border-b border-rule py-6 md:grid-cols-12 md:items-baseline md:gap-10">
              <span className="type-mono text-ink/40 md:col-span-3">{group.group}</span>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-9">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="type-headline transition-colors duration-300 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
