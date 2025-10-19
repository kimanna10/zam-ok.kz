"use client";

import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Counter({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Подписываемся на обновления motionValue
    const unsubscribe = count.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [count]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, count, value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center text-center"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="md:text-4xl text-3xl font-extrabold text-white-primary "
      >
        {displayValue}+
      </motion.span>
      <p className="text-grey mt-2">{label}</p>
    </div>
  );
}
