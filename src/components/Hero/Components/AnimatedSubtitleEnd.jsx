// components/AnimatedSubtitleEnd.jsx
import { motion } from "framer-motion";
import React from "react";

export default function AnimatedSubtitleEnd({ text, delayChildren = 1 }) {
  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delayChildren, 
      },
    },
  };

  const letterAnimation = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const AnimatedLetter = React.memo(({ char }) => (
    <div style={{ overflow: "hidden", display: "inline-block" }}>
      <motion.span
        variants={letterAnimation}
        style={{
          display: "inline-block",
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase",
          color: "black",
          letterSpacing: "-0.02em",
          willChange: "transform"
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </div>
  ));

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
    >
      {text.split("").map((char, i) => (
        <AnimatedLetter key={i} char={char} />
      ))}
    </motion.div>
  );
}
