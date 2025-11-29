'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category?: string;
}

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 轮播数据 - 模拟校园新闻和活动
  const slides: Slide[] = [
    {
      id: 1,
      title: '仙桃职业学院2024年招生工作启动',
      description: '我院今年新增3个专业，涵盖人工智能、大数据等新兴领域',
      image: '/globe.svg',
      link: '/news/admission2024',
      category: '招生信息',
    },
    {
      id: 2,
      title: '我院荣获省级教学成果一等奖',
      description: '护理专业教学团队在全国职业技能大赛中取得优异成绩',
      image: '/window.svg',
      link: '/news/award2024',
      category: '荣誉成就',
    },
    {
      id: 3,
      title: '校园文化艺术节盛大开幕',
      description: '为期两周的文化艺术节将展示我院师生的才艺和创意',
      image: '/file.svg',
      link: '/news/culture2024',
      category: '校园活动',
    },
    {
      id: 4,
      title: '校企合作签约仪式圆满成功',
      description: '我院与多家知名企业签署战略合作协议，深化产教融合',
      image: '/next.svg',
      link: '/news/cooperation2024',
      category: '合作交流',
    },
  ];

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // 处理触摸事件（移动端手势）
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 80;
    const isRightSwipe = distance < -80;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  // 鼠标拖动事件处理（桌面端手势）
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 80;
    const isRightSwipe = distance < -80;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // 鼠标离开时重置拖动状态
  const handleMouseLeave = () => {
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  // 切换到下一张
  const goToNext = () => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // 切换到上一张
  const goToPrev = () => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // 直接跳转到指定索引
  const goToSlide = (index: number) => {
    if (isTransitioning || isDragging || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // 计算每个幻灯片的样式
  const getSlideStyle = (index: number) => {
    const diff = index - currentIndex;
    let position = diff;
    
    // 处理循环效果
    if (Math.abs(diff) > slides.length / 2) {
      position = diff > 0 ? diff - slides.length : diff + slides.length;
    }
    
    // 3D效果参数
    const translateX = position * 120; // 偏移量
    const scale = Math.max(0.8, 1 - Math.abs(position) * 0.2); // 缩放
    const opacity = Math.max(0.5, 1 - Math.abs(position) * 0.4); // 透明度
    const zIndex = slides.length - Math.abs(position); // 层级
    
    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      opacity,
      zIndex,
      transition: isTransitioning ? 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
    };
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg">
      <div
        ref={containerRef}
        className="relative aspect-[21/9] overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* 轮播幻灯片 */}
        <div 
          className="flex absolute w-full h-full justify-center items-center"
          style={{ perspective: '1000px' }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="absolute w-[80%] md:w-[70%] h-full transition-all duration-800 ease-out"
              style={getSlideStyle(index)}
            >
              {/* 图片背景 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60 z-10 transition-opacity hover:opacity-90" />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              
              {/* 内容叠加 */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-8 md:px-16">
                  <div className="max-w-xl transform transition-all duration-700 hover:translate-x-4 hover:scale-105">
                    {slide.category && (
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider bg-blue-500 text-white rounded-full animate-pulse">
                        {slide.category}
                      </span>
                    )}
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-100 mb-6 drop-shadow-md">
                      {slide.description}
                    </p>
                    <Link 
                      href={slide.link} 
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-800 font-medium rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg group"
                    >
                      查看详情
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 拖动提示（移动端） */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-black/30 backdrop-blur-sm text-white rounded-full text-sm opacity-70 animate-fadeIn">
          左右滑动切换
        </div>

        {/* 控制按钮 */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 transform hover:scale-110"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 transform hover:scale-110"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 进度指示器 */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${index === currentIndex ? 'w-12 bg-white shadow-lg shadow-white/30' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;