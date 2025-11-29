'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ResponsiveLayout from './components/ResponsiveLayout';
import BannerCarousel from './components/BannerCarousel';
import { FadeInUp, ParallaxContainer, StaggerFadeInUp } from './hooks/useParallaxAnimation';
import NeumorphicButton from './components/NeumorphicButton';

// 懒加载组件以优化性能
const DepartmentSection = lazy(() => import('./components/SpecialtySection'));
const ActivitySection = lazy(() => import('./components/NewsSection'));

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 页面加载完成后的入场动画控制
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ResponsiveLayout>
      <div className="min-h-screen">
        {/* 轮播Banner - 添加视差效果，增加顶部间距避免被菜单栏覆盖 */}
        <ParallaxContainer factor={0.15} className="relative w-full overflow-hidden pt-32">
          <Suspense fallback={
            <div className="aspect-video bg-background-loading animate-pulse flex items-center justify-center">
              <div className="skeleton-loader w-16 h-16 rounded-full"></div>
            </div>
          }>
            <BannerCarousel />
          </Suspense>
          {/* 装饰性浮动元素 */}
          <div className="absolute top-1/4 right-12 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float hidden lg:block"></div>
          <div className="absolute bottom-1/3 left-12 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float animate-delay-3 hidden lg:block"></div>
        </ParallaxContainer>

        {/* 组织简介 */}
        <section className="py-24 px-4 md:px-8 relative section-padding bg-background">
          <div className="container mx-auto">
            <FadeInUp className="text-center mb-20">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-[#a6c1ee] mb-6 leading-tight tracking-tight">
                自律委员会简介
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] mx-auto rounded-full"></div>
            </FadeInUp>

            <FadeInUp delay={0.2} className="max-w-3xl mx-auto text-center text-text-secondary mb-20">
              <p className="text-lg leading-relaxed">
                自律委员会是仙桃职业学院重要的学生组织，成立多年来始终秉承"服务同学、锻炼自我"的理念，
                致力于提高学生的自我管理能力、团队协作能力等。通过开展各部日常工作、会议组织和志愿服务，
                为同学们创造更好的学习和生活环境，促进学生全面发展，建设和谐校园文化。
              </p>
            </FadeInUp>

            <StaggerFadeInUp interval={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {
                [
                  {
                    icon: '/globe.svg',
                    title: '组织宗旨',
                    description: '自我管理、自我服务、自我教育、自我监督，培养学生的责任感和团队协作精神。',
                    accentColor: '--accent'
                  },
                  {
                    icon: '/window.svg',
                    title: '能力培养',
                    description: '通过参与委员会工作，提升学生的组织能力、沟通能力、协调能力和解决问题的能力。',
                    accentColor: '--accent-alt'
                  },
                  {
                    icon: '/file.svg',
                    title: '实践平台',
                    description: '为学生提供广阔的实践平台，让学生在实际工作中锻炼自己，积累经验。',
                    accentColor: '--accent-tertiary'
                  }
                ].map((item, index) => (
                  <FadeInUp 
                    key={index} 
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden relative group"
                  >
                    {/* 标题展示面 */}
                    <div className="p-8 flex flex-col items-center justify-center h-64 text-center transition-all duration-500 group-hover:opacity-0 absolute inset-0 z-10 bg-white">
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-6 shadow-md transform group-hover:scale-125 transition-transform duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Image 
                          src={item.icon} 
                          alt={item.title} 
                          width={32} 
                          height={32} 
                          style={{ color: '#8bc34a' }}
                        />
                      </motion.div>
                      <motion.h3 
                        className="text-2xl font-bold text-[#8bc34a] transform group-hover:translate-y-4 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        {item.title}
                      </motion.h3>
                    </div>
                    
                    {/* 内容展示面 */}
                    <div className="p-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 h-64 flex flex-col items-center justify-center">
                        <motion.p 
                          className="text-[#666666] text-center flex-1 flex items-center justify-center leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          {item.description}
                        </motion.p>
                    </div>
                    {/* 底部渐变条效果 - 贴边设计 */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] transform scale-x-0 origin-left group-hover:scale-x-100 transition-all duration-700 rounded-none"></div>
                    {/* 顶部渐变条效果 - 贴边设计 */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] transform scale-x-0 origin-left group-hover:scale-x-100 transition-all duration-700 rounded-none"></div>
                    
                    {/* 背景装饰效果 */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle, rgba(139, 195, 74, 0.15) 0%, rgba(139, 195, 74, 0) 70%)` }}></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle, rgba(156, 204, 101, 0.15) 0%, rgba(156, 204, 101, 0) 70%)` }}></div>
                  </FadeInUp>
                ))
              }
            </StaggerFadeInUp>
          </div>
        </section>

        {/* 部门介绍 */}
        <section className="py-24 px-4 md:px-8 bg-background-primary/50 section-padding">
          <div className="container mx-auto">
            <FadeInUp className="text-center mb-20">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-[#a6c1ee] mb-6 leading-tight">
                部门设置
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] mx-auto rounded-full"></div>
              <p className="mt-4 text-[#666666] max-w-2xl mx-auto">自律委员会下设五个部门，各部门分工明确、协同合作</p>
            </FadeInUp>
            
            <StaggerFadeInUp interval={0.15} className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-8">
              {[
                {
                  name: '学习部',
                  description: '组织学习经验交流活动，开展学术讲座，协助学风建设，营造良好的学习氛围。',
                  icon: '/file.svg',
                  accentColor: '--accent-tertiary'
                },
                {
                  name: '办公部',
                  description: '负责委员会日常事务处理，协调各部门工作，管理文档资料，组织会议等。',
                  icon: '/window.svg',
                  accentColor: '--accent-alt'
                },
                {
                  name: '宿管部',
                  description: '负责学生宿舍管理工作，促进宿舍文化建设，维护良好的住宿秩序和生活环境。',
                  icon: '/globe.svg',
                  accentColor: '--accent'
                },
                {
                  name: '纪检部',
                  description: '监督学生日常行为规范，维护校园纪律，组织纪律教育活动，促进优良校风建设。',
                  icon: '/file.svg',
                  accentColor: '--accent-tertiary'
                },
                {
                  name: '劳动部',
                  description: '组织学生参与校园劳动实践，维护校园环境整洁，培养学生的劳动意识和责任感。',
                  icon: '/window.svg',
                  accentColor: '--accent-alt'
                }
              ].map((dept, index) => (
                <FadeInUp 
                    key={index} 
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden relative group ${index < 3 ? 'col-span-2' : 'col-span-2'} ${index === 3 ? 'col-start-2' : ''} ${index === 4 ? 'col-start-4' : ''}`}
                  >
                    {/* 部门名称展示面 */}
                    <div className="p-8 flex flex-col items-center justify-center h-64 text-center transition-all duration-500 group-hover:opacity-0 absolute inset-0 z-10 bg-white">
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-6 shadow-md transform group-hover:scale-125 transition-transform duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Image 
                          src={dept.icon} 
                          alt={dept.name} 
                          width={32} 
                          height={32} 
                          style={{ color: '#8bc34a' }}
                        />
                      </motion.div>
                      <motion.h3 
                        className="text-2xl font-bold text-[#8bc34a] transform group-hover:translate-y-4 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        {dept.name}
                      </motion.h3>
                    </div>
                    
                    {/* 部门职责展示面 */}
                    <div className="p-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 h-64 flex flex-col items-center justify-center">
                        <motion.p 
                          className="text-[#666666] text-center flex-1 flex items-center justify-center leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          {dept.description}
                        </motion.p>
                    </div>
                    {/* 底部渐变条效果 - 贴边设计 */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] transform scale-x-0 origin-left group-hover:scale-x-100 transition-all duration-700 rounded-none"></div>
                    {/* 顶部渐变条效果 - 贴边设计 */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] transform scale-x-0 origin-left group-hover:scale-x-100 transition-all duration-700 rounded-none"></div>
                    
                    {/* 背景装饰效果 */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle, rgba(139, 195, 74, 0.15) 0%, rgba(139, 195, 74, 0) 70%)` }}></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle, rgba(156, 204, 101, 0.15) 0%, rgba(156, 204, 101, 0) 70%)` }}></div>
                  </FadeInUp>
              ))}
            </StaggerFadeInUp>
          </div>
        </section>

        {/* 活动展示 */}
        <section id="main-content" className="py-24 px-4 md:px-8 section-padding bg-background">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <FadeInUp>
                  <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-[#a6c1ee] mb-2 leading-tight">
                    活动动态
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] rounded-full"></div>
                </FadeInUp>
              </div>
              <FadeInUp delay={0.4} className="mt-6 md:mt-0">
                <Link href="/activities" passHref>
                  <button className="px-8 py-4 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    查看更多
                  </button>
                </Link>
              </FadeInUp>
            </div>
            <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-card-bg rounded-lg shadow-light aspect-video animate-pulse skeleton-card"></div>
              ))}
            </div>}>
              <ActivitySection />
            </Suspense>
          </div>
        </section>

        {/* 招新宣传 */}
        <section className="py-32 px-4 md:px-8 bg-gradient-to-r from-[#9ccc65]/10 to-[#7cb342]/10 relative overflow-hidden rounded-3xl mx-4 lg:mx-8 my-20">
          {/* 装饰元素 - 高端光效 */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#9ccc65]/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#7cb342]/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2"></div>
          </div>
          
          <ParallaxContainer factor={0.05} className="container mx-auto text-center relative z-10 px-6">
            <FadeInUp>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#a6c1ee] mb-8 leading-tight">
                加入我们
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg md:text-xl text-[#666666] max-w-2xl mx-auto mb-12 leading-relaxed">
                自律委员会期待你的加入！在这里，你将结交志同道合的朋友，锻炼自己的能力，为学院和同学们做出贡献。
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <Link href="/recruitment" passHref>
                <button className="px-8 py-4 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  查看招新信息
                </button>
              </Link>
            </FadeInUp>
          </ParallaxContainer>
        </section>

        {/* 页脚内容 - 梦幻棉花糖配色 */}
        <footer className="bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] py-20 px-4 md:px-8 mt-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold !text-black mb-4" style={{ color: 'black !important' }}>自律委员会</h3>
                <p className="leading-relaxed !text-black" style={{ color: 'black !important' }}>
                  自我管理、自我服务、自我教育、自我监督，培养学生的责任感和团队协作精神。
                </p>
              </div>
              
              {[
                { title: '快速链接', links: ['首页', '组织简介', '部门设置', '活动动态', '招新信息'] },
                { title: '部门导航', links: ['学习部', '劳动部', '宿管部', '纪检部', '办公部'] },
                { title: '联系我们', links: ['地址: 湖北省仙桃市纺织大道8号', '电话: 0728-3331368', '邮箱: zilvweiyuanhui@hbxtzy.edu.cn'] }
              ].map((column, index) => (
                <div key={index} className="space-y-6">
                  <h3 className="text-lg font-medium !text-black mb-6" style={{ color: 'black !important' }}>{column.title}</h3>
                  <ul className="space-y-5">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="group">
                        <a href="#" className="!text-black transition-colors duration-300 text-sm block hover:translate-x-1 inline-flex items-center" style={{ color: 'black !important' }}>
                          <span className="h-0.5 w-0 bg-white mr-2 transition-all duration-300 group-hover:w-2"></span>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="border-t border-black/20 pt-8 text-center">
              <p className="text-sm !text-black" style={{ color: 'black !important' }}>© {new Date().getFullYear()} 仙桃职业学院自律委员会 版权所有</p>
            </div>
          </div>
        </footer>

      </div>
    </ResponsiveLayout>
  );
}