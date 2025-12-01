import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // 检测设备尺寸变化 - 更精细的断点系统
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
      
      if (width < 360) size = 'xs';
      else if (width < 640) size = 'sm';
      else if (width < 768) size = 'md';
      else if (width < 1024) size = 'lg';
      else if (width < 1280) size = 'xl';
      else size = '2xl';
      
      setScreenSize(size);
      
      // 在桌面模式下自动关闭侧边栏
      if (size !== 'xs' && size !== 'sm') {
        setIsSidebarOpen(false);
      }
    };

    // 初始检测
    checkScreenSize();
    // 监听窗口大小变化，使用节流优化性能
    const handleResize = throttle(checkScreenSize, 200);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 节流函数
  const throttle = (func: Function, delay: number) => {
    let lastCall = 0;
    return function(...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func(...args);
      }
    };
  };

  // 监听滚动事件 - 增强版，添加滚动条自动隐藏功能
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
      setLastScrollTop(scrollTop);
      
      // 滚动时显示滚动条
      document.body.classList.add('scrolling');
      
      // 清除之前的定时器
      clearTimeout(scrollTimeout);
      
      // 300毫秒后移除scrolling类，隐藏滚动条
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // 处理滑动手势（移动端）- 增强版
  useEffect(() => {
    if (screenSize !== 'xs' && screenSize !== 'sm') return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch.clientX < 50) { // 从左侧边缘开始的触摸
        setTouchStartX(touch.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX === null) return;
      const touch = e.touches[0];
      const diff = touch.clientX - touchStartX;
      
      if (diff > 40 && !isSidebarOpen) {
        // 向右滑动且侧边栏未打开，显示侧边栏
        setIsSidebarOpen(true);
        setTouchStartX(null);
      } else if (diff < -40 && isSidebarOpen) {
        // 向左滑动且侧边栏已打开，关闭侧边栏
        setIsSidebarOpen(false);
        setTouchStartX(null);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [screenSize, isSidebarOpen]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // 导航菜单项 - 增强版，添加图标和分组信息
  const menuItems = [
    { label: '首页', path: '/', icon: 'home', group: 'main' },
    { label: '学院概况', path: '/about', icon: 'about', group: 'main' },
    { label: '招生信息', path: '/admission', icon: 'admission', group: 'main' },
    { label: '专业设置', path: '/majors', icon: 'majors', group: 'main' },
    { label: '教学科研', path: '/research', icon: 'research', group: 'main' },
    { label: '校园文化', path: '/culture', icon: 'culture', group: 'main' },
    { label: '招生就业', path: '/career', icon: 'career', group: 'main' },
    { label: '联系我们', path: '/contact', icon: 'contact', group: 'main' },
  ];

  // 处理导航点击
  const handleNavClick = (path: string) => {
    router.push(path);
    if (screenSize === 'xs' || screenSize === 'sm') {
      setIsSidebarOpen(false);
    }
  };

  // 关闭侧边栏
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // 切换侧边栏
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 获取响应式容器类名
  const getContainerClass = () => {
    switch (screenSize) {
      case 'xs': return 'px-4';
      case 'sm': return 'px-4';
      case 'md': return 'px-6';
      case 'lg': return 'px-8';
      case 'xl': return 'px-8';
      case '2xl': return 'px-8';
      default: return 'px-4';
    }
  };

  // 获取侧边栏宽度
  const getSidebarWidth = () => {
    switch (screenSize) {
      case 'xs': return '280px';
      case 'sm': return '300px';
      default: return '320px';
    }
  };

  return (
    <div className="relative min-h-screen bg-background dark:bg-background-dark">
      {/* 滚动进度条 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
      />

      {/* 移动端侧边栏 - 使用framer-motion增强动画 */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* 半透明遮罩 */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeSidebar}
              aria-hidden="true"
            />
            
            {/* 侧边栏 - 新拟态优化 */}
            <motion.div
              ref={sidebarRef}
              className="fixed inset-y-0 left-0 z-50 glass-effect-strong bg-card-light/90 dark:bg-card-dark/90 shadow-xl border-r border-border-light/50"
              style={{ width: getSidebarWidth() }}
              initial={{ x: -getSidebarWidth() }}
              animate={{ x: 0 }}
              exit={{ x: -getSidebarWidth() }}
              transition={{ 
                type: "spring", 
                stiffness: 250, 
                damping: 25, 
                duration: 0.35 
              }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border dark:border-border-dark">
                <div className="text-xl font-bold text-primary dark:text-primary-dark">
                自律委员会
              </div>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-full hover:bg-background hover:bg-opacity-50 dark:hover:bg-background-dark dark:hover:bg-opacity-50 transition-all duration-300"
                  aria-label="关闭菜单"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-secondary dark:text-text-secondary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="p-4 h-[calc(100%-120px)] overflow-y-auto">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <motion.button
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 ${pathname === item.path ?     
                          'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-dark font-medium' :
                          'text-text-primary dark:text-text-primary-dark'}`}
                        aria-current={pathname === item.path ? 'page' : undefined}
                        whileHover={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                          transform: 'translateX(4px)',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="w-5 h-5 flex items-center justify-center">
                          {/* 占位图标，实际项目中可以替换为真实图标 */}
                          <div className="w-3 h-3 bg-text-tertiary dark:bg-text-tertiary-dark rounded-full"></div>
                        </span>
                        {item.label}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border dark:border-border-dark">
                <div className="text-sm text-text-tertiary dark:text-text-tertiary-dark text-center">
                  © 2024 自律委员会 版权所有
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 汉堡菜单按钮（仅移动端显示）- 精致化 */}
      {/* <motion.button
        className={`fixed top-6 left-6 z-40 p-3 rounded-xl glass-effect-light bg-card-light/80 dark:bg-card-dark/80 shadow-neumorphic-sm transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}
        onClick={toggleSidebar}
        aria-label="打开菜单"
        aria-expanded={isSidebarOpen}
        whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-hover)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, ease: 'easeOut' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-primary dark:text-text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </motion.button> */}

      {/* 侧边悬浮按钮组 */}
      <div className="fixed right-8 bottom-8 z-40 flex flex-col gap-4">


        {/* 在线客服按钮 */}
        <motion.button
          className="p-4 rounded-full border border-[#7986cb] text-[#7986cb] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative"
          aria-label="在线客服"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, backgroundColor: '#f8f9ff' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm hidden sm:inline">在线客服</span>
        </motion.button>

        {/* 返回顶部按钮 - 精致化增强版 */}
        <motion.button
          className={`p-4 rounded-full border border-[#7986cb] text-[#7986cb] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="返回顶部"
          initial={{ opacity: 0, y: 20 }}
          animate={isScrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, backgroundColor: '#f8f9ff' }}
          whileTap={{ scale: 0.95 }}
          style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm hidden sm:inline">返回顶部</span>
        </motion.button>
      </div>

      {/* 主内容区域 - 响应式优化 */}
      <main className={`min-h-screen transition-all duration-300 ${getContainerClass()}`}>
        <AnimatePresence mode="wait">   
          <motion.div
            key={pathname}       
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ResponsiveLayout;