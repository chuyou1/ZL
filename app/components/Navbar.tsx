'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems: NavItem[] = [
    { title: '首页', href: '/' },
    { title: '组织简介', href: '/about' },
    { title: '部门设置', href: '/departments' },
    { title: '活动动态', href: '/activities' },
    { title: '招新信息', href: '/recruitment' }
  ];

  // 导航条变体动画 - 梦幻棉花糖配色
  const headerVariants = {
    transparent: {
      background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
      backdropFilter: 'blur(16px)',
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginTop: '0' // 紧贴顶部
    },
    scrolled: {
      background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
      backdropFilter: 'blur(16px)',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginTop: '0' // 紧贴顶部
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial="transparent"
      animate={isScrolled ? 'scrolled' : 'transparent'}
      variants={headerVariants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* 品牌标志 - 始终显示 */}
          <Link 
            href="/" 
            className="text-black font-bold text-xl sm:text-2xl tracking-tight transition-all duration-300"
          >
            计算机科学技术学院
          </Link>
          
          {/* 桌面端导航菜单 - 滚动时隐藏 */}
          <nav className={`hidden lg:flex items-center space-x-8 transition-all duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {navItems.map((item) => (
              <div 
                key={item.title}
                className="relative group"
              >
                <Link 
                  href={item.href}
                  className="text-white/90 hover:text-white text-base font-medium transition-all duration-300 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-accent after:to-accent-alt after:transition-all after:duration-300 group-hover:after:w-full"
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </nav>
          
          {/* 右侧功能按钮 - 滚动时隐藏部分按钮 */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* 我的部门按钮 - 滚动时隐藏 */}
            <Link 
              href="/departments" 
              className={`px-4 py-2 rounded-full bg-white text-[#a6c1ee] font-medium transition-all duration-300 hover:bg-gray-100 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              我的部门
            </Link>
            {/* 在线客服按钮 - 滚动时隐藏 */}
            <button 
              className={`px-4 py-2 rounded-full bg-white text-[#a6c1ee] font-medium transition-all duration-300 hover:bg-gray-100 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              在线客服
            </button>
            {/* 加入按钮 - 滚动时隐藏 */}
            <button 
              className={`px-4 py-2 rounded-full bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white font-medium transition-all duration-300 hover:shadow-lg ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              加入
            </button>
            {/* 用户图标+登录/注册 - 始终显示 */}
            <Link 
              href="/auth" 
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#a6c1ee] text-white font-medium transition-all duration-300 hover:bg-[#9fa8da]"
            >
              <span className="h-5 w-5">👤</span>
              <span className={isScrolled ? 'hidden' : 'inline'}>登录/注册</span>
            </Link>
          </div>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="lg:hidden p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="h-6 w-6 text-white inline-block">
              {isMobileMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl z-40"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="px-4 py-5 space-y-1">
            {navItems.map((item) => (
              <div key={item.title}>
                <Link 
                  href={item.href}
                  className="block px-3 py-3 text-base font-medium text-text-primary hover:bg-background hover:text-primary rounded-lg transition-all duration-200"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border-light space-y-3">
            <Link 
              href="/departments" 
              className="flex items-center gap-2 w-full px-4 py-3 rounded-full border border-[#a6c1ee] text-[#a6c1ee] font-medium transition-all duration-300 hover:bg-[#f8f9ff]"
            >
              <span className="h-5 w-5">🏢</span>
              <span>我的部门</span>
            </Link>
            <button 
              className="flex items-center gap-2 w-full px-4 py-3 rounded-full border border-[#a6c1ee] text-[#a6c1ee] font-medium transition-all duration-300 hover:bg-[#f8f9ff]"
            >
              <span className="h-5 w-5">💬</span>
              <span>在线客服</span>
            </button>
            <button 
              className="flex items-center gap-2 w-full px-4 py-3 rounded-full border border-[#a6c1ee] text-[#a6c1ee] font-medium transition-all duration-300 hover:bg-[#f8f9ff]"
            >
              <span className="h-5 w-5">➕</span>
              <span>加入</span>
            </button>
            <Link 
              href="/auth" 
              className="flex items-center gap-2 w-full px-4 py-3 rounded-full border border-[#a6c1ee] text-[#a6c1ee] font-medium transition-all duration-300 hover:bg-[#f8f9ff]"
            >
              <span className="h-5 w-5">👤</span>
              <span>登录/注册</span>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;