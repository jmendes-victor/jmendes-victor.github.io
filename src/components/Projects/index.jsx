import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars
import ProjectCard from "./Components/ProjectCard";

const projects = [
  { title: "Avery", category: "Web Design", year: "2024" },
  { title: "Bruce", category: "App Development", year: "2023" },
  { title: "Concrete", category: "Brand Identity", year: "2023" },
  { title: "Davis", category: "Web Design", year: "2022" },
];

export default function Projects() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);

  return (
    <div
      ref={containerRef}
      style={{ marginTop: "88vh" }}
      className="relative z-10 w-full bg-white"
    >
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        style={{
          scale,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
        id="work"
        className="w-full bg-[#0f0f0f] text-white py-32 px-4 shadow-2xl overflow-hidden origin-top"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12">
            <h2 className="text-6xl md:text-8xl font-light tracking-tight">
              Selected
              <br />
              Works
            </h2>
            <p className="text-xl text-white/40 max-w-sm mt-8 md:mt-0">
              Projetos selecionados que mostram paixão por design e performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>

          <div className="mt-32 w-full flex justify-center">
            <button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
              Ver todos os projetos
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
