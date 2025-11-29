'use client';

import { Variants, AnimationControls, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

// 基础动画配置
export const baseAnimationConfig = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96] as const, // 自定义缓动函数，提供更自然的动效
};

// 通用淡入动画
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: baseAnimationConfig,
  },
};

// 从下方滑入并淡入动画
export const slideUpAndFade: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...baseAnimationConfig,
    },
  },
};

// 从上方滑入并淡入动画
export const slideDownAndFade: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...baseAnimationConfig,
    },
  },
};

// 从左侧滑入并淡入动画
export const slideRightAndFade: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...baseAnimationConfig,
    },
  },
};

// 从右侧滑入并淡入动画
export const slideLeftAndFade: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...baseAnimationConfig,
    },
  },
};

// 缩放动画
export const scaleAnimation: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ...baseAnimationConfig,
    },
  },
};

// 呼吸动画
export const breatheAnimation: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.03, 1],
    opacity: [0.95, 1, 0.95],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

// 新拟态悬停动画
export const neumorphicHoverAnimation: Variants = {
  hover: {
    boxShadow: 'var(--shadow-neumorphic-hover)',
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    boxShadow: 'var(--shadow-neumorphic-pressed)',
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// 波纹点击效果配置
export const rippleVariants: Variants = {
  initial: { scale: 0, opacity: 0.8 },
  animate: { scale: 2, opacity: 0 },
};

// 列表项交错动画配置
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 使用滚动触发动画的钩子函数
export const useScrollAnimation = (
  controls: AnimationControls,
  options: {
    threshold?: number;
    offset?: string;
    initial?: string;
    animate?: string;
  } = {}
) => {
  const { threshold = 0.1, offset = "0px 0px -50px 0px", initial = "hidden", animate = "visible" } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start(animate);
          } else {
            // 可选：当元素离开视口时重置动画
            // controls.start(initial);
          }
        });
      },
      {
        threshold,
        rootMargin: offset,
      }
    );

    const element = document.querySelector('[data-scroll-animatable="true"]');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls, threshold, offset, initial, animate]);

  return controls;
};

// 自定义动画控制钩子
export const useAnimatedVisibility = () => {
  const controls = useAnimationControls();
  const visibilityControls = useScrollAnimation(controls, {
    threshold: 0.1,
    offset: "0px 0px -50px 0px",
  });

  return visibilityControls;
};

// 动画延迟计算器
export const getAnimationDelay = (index: number, baseDelay: number = 0.1) => {
  return index * baseDelay;
};

// 为卡片组件生成动画变体
export const generateCardVariants = (delay: number = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...baseAnimationConfig,
        delay,
      },
    },
  };
};

// 文本渐入动画
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...baseAnimationConfig,
      staggerChildren: 0.03,
    },
  },
};

// 文本行动画
export const textLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// 滚动视差效果配置
export const parallaxVariants = (factor: number = 0.1): Variants => {
  return {
    initial: {
      y: 0,
    },
    animate: (custom: { scrollY: number }) => ({
      y: custom.scrollY * factor,
    }),
  };
};

// 导航栏滚动动画
export const navbarScrollVariants: Variants = {
  initial: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrolled: {
    backgroundColor: 'var(--bg-primary)',
    boxShadow: 'var(--shadow-sm)',
    paddingTop: 10,
    paddingBottom: 10,
    transition: {
      duration: 0.3,
    },
  },
};