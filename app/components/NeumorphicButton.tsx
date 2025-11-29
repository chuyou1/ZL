'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NeumorphicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  children,
  onClick,
  className = '',
  size = 'medium',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
}) => {
  // 尺寸样式映射
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-7 py-3.5 text-lg',
  };

  // 变体样式映射 - 统一为查看更多活动按钮样式
  const variantClasses = {
    primary: 'border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400',
    secondary: 'border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400',
    accent: 'border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400',
    outline: 'border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400',
  };

  // 基础样式 - 统一为查看更多活动按钮样式
  const neumorphicBaseClasses = 'rounded-full font-medium transition-all duration-300 relative overflow-hidden';
  const neumorphicShadowClasses = 'hover:bg-blue-50 dark:hover:bg-blue-900/20'; // 移除新拟态阴影，使用统一的悬停效果
  const fullWidthClass = fullWidth ? 'w-full justify-center' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  // 组合所有类名
  const buttonClasses = `${neumorphicBaseClasses} ${neumorphicShadowClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidthClass} ${disabledClass} ${className}`;

  // 动画变量
  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.button
      whileHover={buttonVariants.hover}
      whileTap={buttonVariants.tap}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      <div className="flex items-center gap-2">
        {icon && iconPosition === 'left' && icon}
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
            <span>加载中...</span>
          </div>
        ) : (
          children
        )}
        {icon && iconPosition === 'right' && icon}
      </div>
      {/* 微妙的呼吸效果 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0"
        initial={{ x: '-100%' }}
        animate={{ x: '100%', opacity: [0, 0.2, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 1,
        }}
      />
    </motion.button>
  );
};

export default NeumorphicButton;