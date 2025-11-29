import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxEffectProps {
  children: React.ReactNode;
  className?: string;
  type?: 'parallax' | 'reveal' | 'float';
  speed?: number; // 视差速度，0-1之间的值
  offset?: number; // 偏移量
  delay?: number; // 动画延迟
  reverse?: boolean; // 反向动画
  threshold?: number; // 可见性阈值
  id?: string;
}

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  duration: number;
  delay: number;
}

interface ParticleBackgroundProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  className?: string;
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  frequency?: number;
  delay?: number;
}

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}

// 粒子组件
const Particle: React.FC<ParticleProps> = ({ x, y, size, speed, color, duration, delay }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.7,
      }}
      initial={{ x, y, opacity: 0.7 }}
      animate={{
        x: [x, x + Math.random() * 200 - 100, x],
        y: [y, y + Math.random() * 200 - 100, y],
        opacity: [0.7, 0.3, 0.7],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
    />
  );
};

// 粒子背景组件
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 50,
  colors = [
    "rgba(37, 99, 235, 0.3)", // 蓝色
    "rgba(139, 92, 246, 0.3)", // 紫色
    "rgba(236, 72, 153, 0.3)", // 粉色
    "rgba(52, 211, 153, 0.3)", // 绿色
  ],
  minSize = 2,
  maxSize = 8,
  minSpeed = 10,
  maxSpeed = 30,
  className = "",
}) => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    
    // 生成粒子数据
    const newParticles = Array.from({ length: count }, (_, index) => ({
      id: index,
      x: Math.random() * width,
      y: Math.random() * height,
      size: minSize + Math.random() * (maxSize - minSize),
      speed: minSpeed + Math.random() * (maxSpeed - minSpeed),
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: minSpeed + Math.random() * (maxSpeed - minSpeed),
      delay: Math.random() * 5,
    }));

    setParticles(newParticles);

    // 处理窗口调整
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: Math.random() * width,
          y: Math.random() * height,
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count, colors, minSize, maxSize, minSpeed, maxSpeed]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ position: 'relative' }}
    >
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          size={particle.size}
          speed={particle.speed}
          color={particle.color}
          duration={particle.duration}
          delay={particle.delay}
        />
      ))}
    </div>
  );
};

// 悬浮元素组件
export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = "",
  amplitude = 10,
  frequency = 3,
  delay = 0,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    // 创建循环动画
    const animate = async () => {
      await controls.start({
        y: [0, -amplitude, 0],
        transition: {
          duration: frequency,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay,
        },
      });
    };

    animate();
  }, [controls, amplitude, frequency, delay]);

  return (
    <motion.div
      animate={controls}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 光晕效果组件
export const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  className = "",
  color = "rgba(59, 130, 246, 0.5)",
  size = 40,
  opacity = 0.7,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top } = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          filter: `blur(${size / 2}px)`,
          opacity: 0,
        }}
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          opacity: visible ? opacity : 0,
        }}
        transition={{
          x: { type: "spring", damping: 15, stiffness: 500 },
          y: { type: "spring", damping: 15, stiffness: 500 },
          opacity: { duration: 0.2 },
        }}
      />
      {children}
    </div>
  );
};

// 主视差组件
const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  className = "",
  type = 'parallax',
  speed = 0.5,
  offset = 100,
  delay = 0,
  reverse = false,
  threshold = 0.2,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  // 使用state存储视差偏移值，避免useScroll
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // 自定义滚动处理
  useEffect(() => {
    if (!ref.current || type !== 'parallax') return;

    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 计算元素进入视口的百分比
      let progress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // 元素部分或完全在视口中
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const elementHeight = rect.height + windowHeight;
        progress = (windowHeight - Math.max(rect.top, 0)) / elementHeight;
      }
      
      // 计算偏移量
      const newOffset = reverse ? offset * progress : -offset * progress;
      setParallaxOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // 初始化

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [type, offset, reverse]);

  // 处理元素进入视图
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  // 根据类型渲染不同的效果
  switch (type) {
    case 'parallax':
      return (
        <motion.div
          id={id}
          ref={ref}
          className={className}
          style={{ y: parallaxOffset }}
        >
          {children}
        </motion.div>
      );

    case 'reveal':
      return (
        <motion.div
          id={id}
          ref={ref}
          className={className}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.8 * (1 - speed + 0.5), // 调整速度
            ease: "easeOut",
            delay,
          }}
        >
          {children}
        </motion.div>
      );

    case 'float':
      return (
        <motion.div
          id={id}
          ref={ref}
          className={className}
          animate={{
            y: [0, -10 * speed, 0],
          }}
          transition={{
            duration: 4 * (1 - speed + 0.5),
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay,
          }}
        >
          {children}
        </motion.div>
      );

    default:
      return (
        <div id={id} className={className}>
          {children}
        </div>
      );
  }
};

// 视差背景图片组件
export const ParallaxBackground: React.FC<{
  image: string;
  className?: string;
  speed?: number;
  children?: React.ReactNode;
  overlay?: string;
}> = ({ image, className = "", speed = 0.3, children, overlay = "rgba(0, 0, 0, 0.5)" }) => {
  // 避免使用useScroll的target问题，直接在客户端渲染时初始化
  const [y, setY] = useState(0);
  
  useEffect(() => {
    // 仅在客户端运行
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / (document.body.scrollHeight - windowHeight), 1);
      const transformValue = -100 * speed * progress;
      setY(transformValue);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {overlay && (
          <div className="absolute inset-0" style={{ backgroundColor: overlay, zIndex: 10 }}></div>
        )}
        <Image
          src={image}
          alt="Parallax background"
          fill
          className="w-full h-full object-cover object-center"
          priority
        />
      </motion.div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

// 渐变悬停效果组件
export const GradientHover: React.FC<{
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  duration?: number;
}> = ({ 
  children, 
  className = "", 
  colors = ["#2563eb", "#8b5cf6"], 
  duration = 0.3 
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{
        boxShadow: `0 0 20px 0 ${colors[0]}40`
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r"
        style={{ backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` }}
        initial={{ opacity: 0, scale: 1.2 }}
        whileHover={{ opacity: 0.1, scale: 1 }}
        transition={{ duration }}
      />
      {children}
    </motion.div>
  );
};

export default ParallaxEffect;