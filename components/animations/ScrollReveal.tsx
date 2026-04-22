"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  yOffset?: number;
  duration?: number;
  delay?: number;
}

export function ScrollReveal({ children, yOffset = 20, duration = 0.6, delay = 0, className, ...props }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}