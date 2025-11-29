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
      title: '自律委员会2024年招新工作正式启动',
      date: '2024-11-25',
      category: '招新动态',
      summary: '自律委员会2024年秋季招新工作正式启动，欢迎有热情、有责任心的同学加入我们的大家庭',
      image: '/next.svg',
      isImportant: true,
      href: '/activities/recruitment2024',
    },
    {
      id: 2,
      title: '学习部举办期末复习经验交流会',
      date: '2024-11-20',
      category: '部门活动',
      summary: '学习部组织优秀学生代表分享学习经验，帮助同学们更好地备考期末考试',
      image: '/vercel.svg',
      href: '/activities/study-sharing',
    },
    {
      id: 3,
      title: '关于开展校园文明月活动的通知',
      date: '2024-11-18',
      category: '通知公告',
      summary: '自律委员会将开展为期一个月的校园文明月活动，倡导文明行为，共建美好校园',
      image: '/globe.svg',
      isImportant: true,
      href: '/activities/civilization-month',
    },
    {
      id: 4,
      title: '宿管部组织宿舍文化节活动',
      date: '2024-11-15',
      category: '部门活动',
      summary: '宿管部举办宿舍文化节，通过宿舍美化评比等活动，营造温馨和谐的宿舍环境',
      image: '/window.svg',
      href: '/activities/dorm-culture',
    },
  ];

  const categories = ['all', '招新动态', '部门活动', '通知公告', '培训交流'];

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          
          {/* 响应式分类筛选标签 */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${activeCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
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
                <ResponsiveCard
                hoverable={true}
                clickable={false}
                padding="none"
                shadow="medium"
                borderRadius="large"
                className="overflow-hidden flex flex-col h-full"
              >
                <Link
                  href={item.href}
                  className="group block overflow-hidden h-full flex flex-col"
                  aria-label={`${item.category}: ${item.title}`}
                >
                  {/* 优化图片比例，更适合移动设备 */}
                  <div className="aspect-[3/2] sm:aspect-video relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 2} // 为重要图片添加优先级
                    />
                    {item.isImportant && (
                      <div className="absolute top-3 right-3 z-10">
                          <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            重要
                          </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className="mr-3">{item.date}</span>
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 flex-grow">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      阅读全文
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ResponsiveCard>
                </FadeInUp>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/activities" 
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-medium rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            查看更多活动
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;