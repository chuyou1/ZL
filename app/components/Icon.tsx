'use client';

import React from 'react';
import { motion } from 'framer-motion';

// 图标变体类型
export type IconVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'outline';

// 图标尺寸类型
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 预定义的SVG图标组件
const GlobeIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const WindowIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const FileIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const UsersIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const ChevronRightIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronLeftIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const NextIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 11 13 5.76 7.76 4.34 9.18 11 15.84 17.66 9.18 16.24 7.76" />
  </svg>
);

const VercelIcon = ({ className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

// 图标映射表
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: GlobeIcon,
  window: WindowIcon,
  file: FileIcon,
  users: UsersIcon,
  chart: ChartIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-left': ChevronLeftIcon,
  next: NextIcon,
  vercel: VercelIcon,
};

interface IconProps {
  name: keyof typeof iconMap;
  size?: IconSize;
  variant?: IconVariant;
  className?: string;
  animate?: boolean;
  hoverable?: boolean;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  variant = 'default',
  className = '',
  animate = false,
  hoverable = false,
}) => {
  // 获取图标组件
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  // 尺寸类名映射
  const sizeClasses: Record<IconSize, string> = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  // 变体类名映射
  const variantClasses: Record<IconVariant, string> = {
    default: 'text-text-primary',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    outline: 'text-border',
  };

  // 基础类名
  const baseClasses = `${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // 静态图标
  const renderStaticIcon = () => (
    <IconComponent className={baseClasses} />
  );

  // 动画图标
  const renderAnimatedIcon = () => {
    const animationVariants = {
      hover: {
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 },
      },
    };

    return (
      <motion.div
        whileHover={hoverable ? animationVariants.hover : {}}
        className={hoverable ? 'cursor-pointer' : ''}
      >
        <IconComponent className={baseClasses} />
      </motion.div>
    );
  };

  // 呼吸动画图标
  const renderBreathingIcon = () => {
    return (
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className={hoverable ? 'cursor-pointer' : ''}
      >
        <IconComponent className={baseClasses} />
      </motion.div>
    );
  };

  // 根据props返回适当的图标渲染
  if (animate && !hoverable) {
    return renderBreathingIcon();
  } else if (hoverable || animate) {
    return renderAnimatedIcon();
  } else {
    return renderStaticIcon();
  }
};

export default Icon;