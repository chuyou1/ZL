'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string | null;
  link?: string;
  buttonText?: string;
  bgGradient?: string;
}

interface BannerCarouselProps {
  slides?: BannerSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({
  slides: propSlides,
  autoPlay = true,
  autoPlayInterval = 6000,
  className = '',
}) => {
  // 默认轮播数据 - 高端设计方案
  const defaultSlides: BannerSlide[] = [
    {
      id: '1',
      title: '自律委员会',
      subtitle: '自我管理、自我服务、自我教育、自我监督',
      imageUrl: null,
      link: '/about',
      buttonText: '了解我们',
      bgGradient: 'from-primary-dark via-primary to-primary-light'
    },
    {
      id: '2',
      title: '部门风采展示',
      subtitle: '五大部门协同合作，共创美好校园',
      imageUrl: null,
      link: '/departments',
      buttonText: '部门介绍',
      bgGradient: 'from-accent-dark via-accent to-accent-light'
    },
    {
      id: '3',
      title: '招新活动',
      subtitle: '加入我们，锻炼能力，结交朋友',
      imageUrl: null,
      link: '/recruitment',
      buttonText: '立即报名',
      bgGradient: 'from-accent-alt/80 via-accent/90 to-accent-tertiary/80'
    }
  ];
  
  const slides = propSlides || defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 自动播放逻辑
  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, currentIndex]);

  // 清除自动播放
  const clearAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // 重置自动播放
  const resetAutoPlay = () => {
    clearAutoPlay();
    if (autoPlay && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }
  };

  // 滚动到下一个
  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    // 重置过渡状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // 滚动到上一个
  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    // 重置过渡状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // 滚动到指定索引
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // 重置过渡状态
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    
    // 重置自动播放
    resetAutoPlay();
  };

  // 鼠标悬停时暂停自动播放
  const handleMouseEnter = () => {
    clearAutoPlay();
  };

  // 鼠标离开时恢复自动播放
  const handleMouseLeave = () => {
    resetAutoPlay();
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl shadow-xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 轮播图片容器 */}
      <div
        className="relative aspect-[21/9] md:aspect-[16/6] w-full overflow-hidden"
        style={{
          height: '400px',
          minHeight: '300px',
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          
          return (
            <motion.div
              key={slide.id}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0, x: isActive ? 0 : index < currentIndex ? -100 : 100 }}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : index < currentIndex ? -100 : 100,
                scale: isActive ? 1 : 0.95,
                zIndex: isActive ? 10 : 5,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.15,
              }}
            >
              {/* 高端背景层 - 支持图片或渐变 */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {slide.imageUrl ? (
                  <motion.img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    animate={{
                      filter: isActive ? 'brightness(1) contrast(1.05)' : 'brightness(0.7) contrast(0.9)',
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <motion.div 
                    className={`w-full h-full bg-gradient-to-br ${slide.bgGradient || 'from-primary-dark via-primary to-primary-light'}`}
                    animate={{
                      backgroundPosition: isActive ? '0% 50%' : '100% 50%',
                    }}
                    transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                  />
                )}
                
                {/* 精致渐变叠加层 */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent"></div>
                
                {/* 高级光照效果 */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 to-transparent"></div>
                
                {/* 纹理叠加 */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmMjAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iI2ZmZmZmZjQwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-30 mix-blend-overlay"></div>
              </div>

              {/* 文字内容 - 精致排版 */}
              <motion.div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 text-white">
                <motion.div 
                  className="max-w-xl space-y-6"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  initial="hidden"
                  animate={isActive ? "visible" : "hidden"}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* 装饰线 */}
                  <motion.div 
                    className="h-1 w-16 bg-accent mb-4"
                    variants={{
                      hidden: { width: 0, opacity: 0 },
                      visible: { width: 64, opacity: 1 }
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                  
                  <motion.h2 
                    className="text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)] font-bold mb-4 leading-[1.1] tracking-tight"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ delay: 0.2 }}
                  >
                    {slide.title}
                  </motion.h2>
                  
                  {slide.subtitle && (
                    <motion.p 
                      className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ delay: 0.4 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                  
                  {slide.link && slide.buttonText && (
                    <motion.div
                      variants={{hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}
                      transition={{ delay: 0.6 }}
                    >
                      <Link href={slide.link} passHref>
                        <motion.button
                          className="inline-flex items-center px-8 py-4 bg-white text-primary font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/95"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {slide.buttonText}
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </motion.svg>
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* 导航按钮 */}
      {slides.length > 1 && (
        <>
          {/* 高端导航按钮 */}
          <motion.button
            onClick={goToPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 focus:outline-none"
            aria-label="上一张"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 focus:outline-none"
            aria-label="下一张"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          {/* 高端精致指示器 */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3 px-6 py-3 bg-black/20 backdrop-blur-xl rounded-full border border-white/10">
            {slides.map((_, index) => {
              const isActive = index === currentIndex;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-500 ease-out focus:outline-none ${isActive ? 'w-10 bg-white shadow-lg' : 'w-3 bg-white/40'}`}
                  aria-label={`转到幻灯片 ${index + 1}`}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                </motion.button>
              );
            })}
          </div>
        </>
      )}


    </div>
  );
};

export default BannerCarousel;