import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function Navbar() {
  const { scrollY } = useScroll();
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const updateThreshold = () => {
      setThreshold(window.innerHeight * 0.88);
    };
    updateThreshold();
    window.addEventListener("resize", updateThreshold);
    return () => window.removeEventListener("resize", updateThreshold);
  }, []);

  const transitionRange = [threshold, threshold + 50];

  const textColor = useTransform(scrollY, transitionRange, ["rgba(0,0,0,0.8)", "#ffffff"]);
  const backgroundColor = useTransform(scrollY, transitionRange, ["rgba(255,255,255,0)", "rgba(15,15,15,0)"]);
  const backdropBlur = useTransform(scrollY, transitionRange, ["blur(0px)", "blur(10px)"]);
  const borderColor = useTransform(scrollY, transitionRange, ["rgba(255,255,255,0)", "rgba(255,255,255,0.02)"]);
  const logoFilter = useTransform(scrollY, transitionRange, ["invert(0)", "invert(1)"]);

  return (
    <motion.nav
      className="fixed z-50 top-0 left-0 w-full"
      style={{
        padding: "20px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        borderBottom: "1px solid",
        borderColor,
      }}
    >
      <div className="container mx-auto flex justify-between items-center px-8">
        <motion.div
          className="flex gap-8 text-sm font-medium uppercase tracking-wide"
          style={{ color: textColor }}
        >
          <a href="#work" className="hover:opacity-80 transition">
            Projetos
          </a>
          <a href="#about" className="hover:opacity-80 transition">
            Sobre
          </a>
        </motion.div>

        <div className="select-none" style={{ pointerEvents: "none" }}>
          <motion.img
            src="/img/logo/felinus.svg"
            alt=""
            width={42}
            style={{ filter: logoFilter }}
          />
        </div>

        <motion.div
          className="flex gap-8 text-sm font-medium uppercase tracking-wide"
          style={{ color: textColor }}
        >
          <a href="#portfolio" className="hover:opacity-80 transition">
            Portfólio
          </a>
          <a href="#contact" className="hover:opacity-80 transition">
            Contato
          </a>
        </motion.div>
      </div>
    </motion.nav>
  );
}
