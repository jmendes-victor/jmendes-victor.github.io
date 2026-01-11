import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import React from "react";


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.6,
    },
  },
};

const letterAnimation = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const AnimatedLetter = React.memo(({ char }) => (
  <span style={{ overflow: "hidden", display: "inline-block", verticalAlign: "bottom" }}>
    <motion.span
      variants={letterAnimation}
      style={{
        display: "inline-flex",
        fontSize: 140,
        fontWeight: 700,
        fontFamily: "'Inter', sans-serif",
        textTransform: "uppercase",
        color: "black",
        lineHeight: 0.9,
        willChange: "transform",
        textAlign: "start",
        letterSpacing: "-0.04em",
        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  </span>
));

export default function AnimatedName({ name }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        gap: 2,
        background: "transparent",
        alignItems: "flex-end",
      }}
    >
      {name.split("").map((char, i) => (
        <AnimatedLetter key={i} char={char} />
      ))}
    </motion.div>
  );
}
