"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SlideIn({
  children,
  xOffset = 40,
  duration = 0.8,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  xOffset?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
