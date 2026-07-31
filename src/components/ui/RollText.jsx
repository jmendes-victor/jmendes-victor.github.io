/**
 * Texto que "rola" no hover: a cópia de cima sobe e sai, a de baixo entra.
 * É o mesmo efeito dos links do template Jack — feito só com CSS, sem JS.
 *
 * Espera um ancestral com a classe `group` (ou passe `self` para virar o group).
 */
export default function RollText({ children, className = "", self = false }) {
  return (
    <span
      className={`relative inline-block overflow-hidden align-bottom ${
        self ? "group" : ""
      } ${className}`}
    >
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 motion-reduce:hidden"
      >
        {children}
      </span>
    </span>
  );
}
