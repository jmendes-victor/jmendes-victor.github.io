// components/CustomCursor.jsx
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Valores reativos para X e Y do cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Use spring para suavizar o movimento
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "#6300ff",
        pointerEvents: "none",
        zIndex: 10000,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        backdropFilter: "blur(2px)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    />
  );
}
