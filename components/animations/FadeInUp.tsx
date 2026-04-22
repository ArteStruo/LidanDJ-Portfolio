"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface FadeInUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export function FadeInUp({ children, delay = 0, yOffset = 20, duration = 0.6, className, ...props }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}