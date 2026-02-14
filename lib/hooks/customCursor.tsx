"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const isDisabled = (el: HTMLElement) => {
      if (el.getAttribute("aria-disabled") === "true") return true;
      if ("disabled" in el && Boolean((el as unknown as { disabled?: boolean }).disabled))
        return true;
      return false;
    };

    const isInteractive = (el: Element | null) => {
      if (!el) return false;
      const target = (el as HTMLElement).closest(
        '[data-cursor="pointer"],a,button,[role="button"],input,select,textarea,label,summary',
      ) as HTMLElement | null;
      if (!target) return false;
      if (target.getAttribute("data-cursor") === "pointer") return true;
      if (isDisabled(target)) return false;
      return true;
    };

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      const hoveredEl = document.elementFromPoint(e.clientX, e.clientY);
      setIsPointer(isInteractive(hoveredEl));
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none ">
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="relative w-8 h-8 flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.6 : isPointer ? 1.5 : 1,
            rotate: isClicked ? 180 : 0,
            borderColor: isPointer ? "#00ff88" : "rgba(255, 255, 255, 0.5)",
          }}
          className="absolute inset-0 border-2 rounded-lg transition-colors duration-300"
        />

        <motion.div
          animate={{ scale: isClicked ? 2.5 : 1 }}
          className="w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_#00ff88]"
        />

        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 border border-emerald-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
