'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// 视差滚动钩子
export const useParallax = (factor = 0.2, limit?: number) => {
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, limit || 1000], [0, (limit || 1000) * factor]);
  
  return { y };
};

// 元素入场动画钩子
export const useFadeInUp = ({
  threshold = 0.1,
  duration = 0.6,
  initialY = 20,
  delay = 0
} = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: `${100 - threshold * 100}% 0px`, once: true });
  
  const variants = {
    hidden: { opacity: 0, y: initialY },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }
  };
  
  return { ref, isInView, variants };
};

// 视差容器组件
export const ParallaxContainer = ({ children, className = '', factor = 0.2, limit }: { children: React.ReactNode; className?: string; factor?: number; limit?: number }) => {
  const { y } = useParallax(factor, limit);
  return React.createElement(motion.div, { 
    className: `relative ${className}`, 
    style: { y },
    children
  });
};

// 带淡入效果的视差元素组件
export const AnimatedParallaxElement = ({ children, className = '', factor = 0.1, limit, delay = 0, duration = 0.6 }: {
  children: React.ReactNode;
  className?: string;
  factor?: number;
  limit?: number;
  delay?: number;
  duration?: number;
}) => {
  const { y } = useParallax(factor, limit);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px 0px' });

  const variants = {
    hidden: { opacity: 0, y: 30, transition: { duration, delay } },
    visible: { opacity: 1, y: 0, transition: { duration, delay } }
  };

  return React.createElement(motion.div, {
    ref,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    variants,
    className: `relative ${className}`,
    style: { y },
    children
  });
};

// 入场动画组件
export const FadeInUp = ({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.6,
  initialY = 20
}) => {
  const { ref, isInView, variants } = useFadeInUp({ delay, duration, initialY });
  
  return React.createElement(motion.div, {
    ref,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    className,
    children
  });
};

// 错开入场动画的容器组件
export const StaggerFadeInUp = ({ 
  children,
  className = '',
  delay = 0,
  interval = 0.15,
  duration = 0.6
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: interval,
        delayChildren: delay,
        duration
      }
    }
  };
  
  return React.createElement(motion.div, {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-100px" },
    variants,
    className,
    children
  });
};