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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      transition={{ duration: 1.8, ease: 'easeInOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* 品牌标志 - 始终显示 */}
          <Link 
            href="/" 
            className="font-bold text-xl sm:text-2xl tracking-tight transition-all duration-300 text-black"
            style={{ color: 'black' }}
          >
            计算机科学技术学院
          </Link>
          
          {/* 右侧功能链接 - 始终显示，从右到左排列 */}
          <div className="flex items-center space-x-6">
            {/* 登录/注册链接 - 最右侧 */}
            <motion.Link 
              href="/auth" 
              className="flex items-center justify-center px-6 py-3 bg-white text-[#a6c1ee] font-medium rounded-full hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all"
              initial={{ 
                width: 'auto', 
                height: 'auto',
                minWidth: 'auto'
              }}
              animate={{ 
                width: isScrolled ? '3rem' : 'auto', 
                height: isScrolled ? '3rem' : 'auto',
                padding: isScrolled ? '0' : '0 1.5rem',
                minWidth: isScrolled ? '3rem' : 'auto'
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <motion.span 
                className="inline-block align-middle text-lg mr-2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                👤
              </motion.span>
              <motion.span 
                className="inline-block align-middle whitespace-nowrap"
                initial={{ opacity: 1, width: 'auto' }}
                animate={isScrolled ? 
                  { opacity: 0, width: 0 } : 
                  { opacity: 1, width: 'auto' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                登录/注册
              </motion.span>
            </motion.Link>
            {/* 我的部门链接 - 右侧第二个 */}
            <motion.Link 
              href="/departments" 
              className="flex items-center justify-center px-6 py-3 bg-white text-[#a6c1ee] font-medium rounded-full hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all"
              initial={{ 
                width: 'auto', 
                height: 'auto',
                minWidth: 'auto'
              }}
              animate={{ 
                width: isScrolled ? '3rem' : 'auto', 
                height: isScrolled ? '3rem' : 'auto',
                padding: isScrolled ? '0' : '0 1.5rem',
                minWidth: isScrolled ? '3rem' : 'auto'
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <motion.span 
                className="inline-block align-middle text-lg mr-2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                🏢
              </motion.span>
              <motion.span 
                className="inline-block align-middle whitespace-nowrap"
                initial={{ opacity: 1, width: 'auto' }}
                animate={isScrolled ? 
                  { opacity: 0, width: 0 } : 
                  { opacity: 1, width: 'auto' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                我的部门
              </motion.span>
            </motion.Link>
            {/* 部门事务链接 - 右侧第三个 */}
            <motion.Link 
              href="/department-affairs" 
              className="flex items-center justify-center px-6 py-3 bg-white text-[#a6c1ee] font-medium rounded-full hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all"
              initial={{ 
                width: 'auto', 
                height: 'auto',
                minWidth: 'auto'
              }}
              animate={{ 
                width: isScrolled ? '3rem' : 'auto', 
                height: isScrolled ? '3rem' : 'auto',
                padding: isScrolled ? '0' : '0 1.5rem',
                minWidth: isScrolled ? '3rem' : 'auto'
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <motion.span 
                className="inline-block align-middle text-lg mr-2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                📋
              </motion.span>
              <motion.span 
                className="inline-block align-middle whitespace-nowrap"
                initial={{ opacity: 1, width: 'auto' }}
                animate={isScrolled ? 
                  { opacity: 0, width: 0 } : 
                  { opacity: 1, width: 'auto' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                部门事务
              </motion.span>
            </motion.Link>
            {/* 加入链接 - 最左侧 */}
            <motion.Link 
              href="/recruitment" 
              className="flex items-center justify-center px-6 py-3 bg-white text-[#a6c1ee] font-medium rounded-full hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-all"
              initial={{ 
                width: 'auto', 
                height: 'auto',
                minWidth: 'auto'
              }}
              animate={{ 
                width: isScrolled ? '3rem' : 'auto', 
                height: isScrolled ? '3rem' : 'auto',
                padding: isScrolled ? '0' : '0 1.5rem',
                minWidth: isScrolled ? '3rem' : 'auto'
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <motion.span 
                className="inline-block align-middle text-lg mr-2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                ➕
              </motion.span>
              <motion.span 
                className="inline-block align-middle whitespace-nowrap"
                initial={{ opacity: 1, width: 'auto' }}
                animate={isScrolled ? 
                  { opacity: 0, width: 0 } : 
                  { opacity: 1, width: 'auto' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              >
                加入
              </motion.span>
            </motion.Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;