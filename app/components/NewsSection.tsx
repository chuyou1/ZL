'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResponsiveCard from './ResponsiveCard';
import { FadeInUp } from '../hooks/useParallaxAnimation';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
  isImportant?: boolean;
  href: string;
}

const NewsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: '自律委员会2025年招新工作正式启动',
      date: '2025-09-28',
      category: '招新动态',
      summary: '自律委员会2025年秋季招新工作正式启动，欢迎有热情、有责任心的同学加入我们的大家庭',
      image: '/next.svg',
      isImportant: true,
      href: '/activities/recruitment2025',
    },
    {
      id: 2,
      title: '学习部举办专业知识经验交流会',
      date: '2025-11-20',
      category: '部门活动',
      summary: '学习部组织优秀学生代表分享学习经验，帮助同学们更好学习专业技术',
      image: '/vercel.svg',
      href: '/activities/study-sharing',
    },
    {
      id: 4,
      title: '宿管部组织宿舍文化节活动',
      date: '2025-11-15',
      category: '部门活动',
      summary: '宿管部举办宿舍文化节，通过宿舍美化评比等活动，营造温馨和谐的宿舍环境',
      image: '/window.svg',
      href: '/activities/dorm-culture',
    },
    {
      id: 3,
      title: '关于开展校园文明月活动的通知',
      date: '2025-11-18',
      category: '通知公告',
      summary: '自律委员会将开展为期一个月的校园文明月活动，倡导文明行为，共建美好校园',
      image: '/globe.svg',
      isImportant: true,
      href: '/activities/civilization-month',
    },
  ];

  const categories = ['all', '招新动态', '部门活动', '通知公告', '培训交流'];

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-0 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          
          {/* 响应式分类筛选标签 */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${activeCategory === category 
                    ? 'bg-[#a6c1ee] text-white' 
                    : 'bg-white text-[#666666] hover:bg-[#f8f9ff]'}`}
                  aria-label={`筛选${category === 'all' ? '全部' : category}新闻`}
                >
                  {category === 'all' ? '全部' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 优化的响应式网格布局，确保在各种屏幕尺寸下表现良好 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredNews.map((item, index) => (
            <FadeInUp key={item.id} delay={index * 0.1}>
              <div className="bg-white rounded-xl shadow-md p-4 relative group">
                {item.isImportant && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      重要
                    </div>
                  </div>
                )}
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span className="mr-3">{item.date}</span>
                  <span className="px-2 py-0.5 bg-[#e8f5e8] text-[#8bc34a] rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  {item.summary}
                </p>
                <div className="flex items-center text-[#8bc34a] font-medium text-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  阅读全文
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>

        <div className="text-center mt-10">
            <FadeInUp delay={0.4}>
              <Link 
                href="/activities" 
                passHref
              >
                <button className="px-8 py-4 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  查看更多活动
                </button>
              </Link>
            </FadeInUp>
          </div>
      </div>
    </section>
  );
};

export default NewsSection;