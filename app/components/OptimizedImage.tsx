'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type ImageVariant = 'default' | 'card' | 'banner' | 'avatar' | 'icon';

export type ImageShape = 'rounded' | 'rounded-lg' | 'rounded-full' | 'sharp';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  variant?: ImageVariant;
  shape?: ImageShape;
  hoverEffect?: boolean;
  lazyLoad?: boolean;
  withOverlay?: boolean;
  overlayColor?: string;
  neumorphicEffect?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  variant = 'default',
  shape = 'rounded',
  hoverEffect = true,
  lazyLoad = true,
  withOverlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.2)',
  neumorphicEffect = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const defaultImage = '/next.svg'; // 默认占位图

  // 变体样式映射
  const variantClasses: Record<ImageVariant, string> = {
    default: 'w-full h-auto',
    card: 'w-full h-48 object-cover',
    banner: 'w-full h-full object-cover',
    avatar: 'w-full h-full object-cover',
    icon: 'w-full h-auto',
  };

  // 形状样式映射
  const shapeClasses: Record<ImageShape, string> = {
    rounded: 'rounded-lg',
    'rounded-lg': 'rounded-xl',
    'rounded-full': 'rounded-full',
    sharp: 'rounded-none',
  };

  // 新拟态效果类名
  const neumorphicClasses = neumorphicEffect 
    ? 'shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-300' 
    : '';

  // 组合类名
  const imageClasses = `${variantClasses[variant]} ${shapeClasses[shape]} ${neumorphicClasses} ${className}`;

  // 错误处理
  const handleError = () => {
    setHasError(true);
  };

  // 加载完成处理
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // 悬停效果动画配置
  const hoverVariants = {
    initial: {
      scale: 1,
      filter: 'brightness(1)',
    },
    hover: {
      scale: 1.03,
      filter: 'brightness(1.05) contrast(1.05)',
      transition: {
        duration: 0.3,
      },
    },
  };

  // 淡入动画配置
  const fadeInVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // 渲染图片内容
  const renderImage = () => {
    const imageToRender = hasError ? defaultImage : src;

    // 带悬停效果的图片
    if (hoverEffect) {
      return (
        <motion.div
          variants={hoverVariants}
          initial="initial"
          whileHover="hover"
          className="overflow-hidden"
        >
          <Image
            src={imageToRender}
            alt={alt}
            width={width}
            height={height}
            className={imageClasses}
            onLoad={handleLoad}
            onError={handleError}
            priority={!lazyLoad}
            loading={lazyLoad ? 'lazy' : 'eager'}
          />
          {withOverlay && (
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: overlayColor }}
            />
          )}
        </motion.div>
      );
    }

    // 普通图片
    return (
      <Image
        src={imageToRender}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        onLoad={handleLoad}
        onError={handleError}
        priority={!lazyLoad}
        loading={lazyLoad ? 'lazy' : 'eager'}
      />
    );
  };

  // 骨架屏加载状态
  const renderSkeleton = () => {
    return (
      <div className={`bg-skeleton animate-pulse ${imageClasses} flex items-center justify-center`}>
        <span className="text-xs text-gray-400">加载中...</span>
      </div>
    );
  };

  return (
    <div 
      ref={imageRef} 
      className={`relative ${neumorphicEffect ? 'p-1' : ''}`}
      style={{ 
        backgroundColor: neumorphicEffect ? 'var(--card-bg)' : 'transparent',
        borderRadius: shape === 'rounded-full' ? '50%' : shape === 'rounded-lg' ? 'var(--rounded-xl)' : shape === 'rounded' ? 'var(--rounded-lg)' : '0',
      }}
    >
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="relative"
      >
        {isLoaded ? renderImage() : renderSkeleton()}
      </motion.div>
    </div>
  );
};

// 预定义的图片组件变体
export const CardImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="card" />
);

export const BannerImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="banner" />
);

export const Avatar = (props: Omit<OptimizedImageProps, 'variant' | 'shape'>) => (
  <OptimizedImage {...props} variant="avatar" shape="rounded-full" />
);

export const IconImage = (props: Omit<OptimizedImageProps, 'variant'>) => (
  <OptimizedImage {...props} variant="icon" />
);

export default OptimizedImage;