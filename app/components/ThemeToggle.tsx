'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isAnimating, setIsAnimating] = useState(false);

  // 初始化主题
  useEffect(() => {
    // 从localStorage中获取主题，或者使用系统偏好
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  // 切换主题函数
  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    
    // 动画完成后重置动画状态
    setTimeout(() => setIsAnimating(false), 600);
  };

  // 动画变体
  const toggleVariants = {
    light: {
      backgroundColor: 'var(--card-bg)',
      boxShadow: 'var(--shadow-neumorphic)',
    },
    dark: {
      backgroundColor: 'var(--card-bg)',
      boxShadow: 'var(--shadow-neumorphic)',
    },
  };

  const circleVariants = {
    light: {
      x: 0,
      backgroundColor: 'var(--accent)',
    },
    dark: {
      x: 24,
      backgroundColor: 'var(--primary)',
    },
  };

  const sunIconVariants = {
    light: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    dark: {
      opacity: 0,
      scale: 0.8,
      x: -5,
    },
  };

  const moonIconVariants = {
    light: {
      opacity: 0,
      scale: 0.8,
      x: 5,
    },
    dark: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
  };

  // 背景星星动画
  const starsVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const starVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: [0, 1, 0.7, 1],
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // 生成星星位置
  const generateStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 40,
      y: Math.random() * 40,
      size: 1 + Math.random() * 2,
      delay: i * 0.02,
    }));
  };

  const stars = generateStars(15);

  return (
    <motion.button
      className={`relative p-2 rounded-full ${className}`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={toggleVariants}
      animate={theme}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute w-6 h-6 rounded-full"
        variants={circleVariants}
        animate={theme}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={sunIconVariants}
          animate={theme}
          transition={{ duration: 0.3 }}
        >
          <Icon name="vercel" size="xs" className="text-white" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={moonIconVariants}
          animate={theme}
          transition={{ duration: 0.3 }}
        >
          <Icon name="window" size="xs" className="text-white" />
        </motion.div>
      </motion.div>

      {/* 星星背景效果 */}
      <AnimatePresence>
        {isAnimating && theme === 'dark' && (
          <motion.div
            className="absolute inset-0"
            initial="initial"
            animate="visible"
            exit="initial"
            variants={starsVariants}
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                initial="initial"
                animate="visible"
                exit="initial"
                variants={starVariants}
                custom={star.delay}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;