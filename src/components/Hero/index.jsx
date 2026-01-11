// Hero.jsx
import AnimatedName from "./Components/AnimatedName";
import AnimatedSubtitle from "./Components/AnimatedSubtitle";
import AnimatedSubtitleEnd from "./Components/AnimatedSubtitleEnd";

export default function Hero() {
  return (
    <section
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        minHeight: "100vh",
        width: "100vw",
        zIndex: 2,
        background: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      id="hero"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "min-content",
          height: "min-content",
        }}
      >
        <AnimatedName name="MENDES" />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AnimatedSubtitle text="DESENVOLVEDOR" />
          <AnimatedSubtitleEnd text="PORTFÓLIO 2026" />
        </div>
      </div>
    </section>
  );
}
