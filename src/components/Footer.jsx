import RollText from "./ui/RollText";
import { socials, profile } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="panel panel-dark gutter relative z-10 pb-8"
    >
      <div className="flex flex-col gap-6 border-t border-[var(--rule)] pt-6 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="type-mono text-[var(--fg-mute)]">
          © {year} {profile.name} · {profile.location}
        </span>

        <ul className="flex flex-wrap gap-6">
          {socials.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="type-mono group inline-block transition-colors duration-300 hover:text-accent"
              >
                <RollText>{item.label}</RollText>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
