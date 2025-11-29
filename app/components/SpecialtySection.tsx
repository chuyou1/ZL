'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ResponsiveCard from './ResponsiveCard';

interface Specialty {
  id: number;
  name: string;
  description: string;
  image: string;
  href: string;
  icon: string;
}

const SpecialtySection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('all'); // 添加专业分类切换功能

  const specialties: Specialty[] = [
    {
      id: 1,
      name: '护理',
      description: '国家级骨干专业，培养高素质护理人才',
      image: '/globe.svg',
      href: '/specialties/nursing',
      icon: '🏥',
    },
    {
      id: 2,
      name: '应用电子技术',
      description: '省级重点专业，专注电子信息领域',
      image: '/window.svg',
      href: '/specialties/electronics',
      icon: '💻',
    },
    {
      id: 3,
      name: '临床医学',
      description: '特色优势专业，培养基层医疗人才',
      image: '/file.svg',
      href: '/specialties/clinical',
      icon: '👨‍⚕️',
    },
    {
      id: 4,
      name: '物联网应用技术',
      description: '新兴交叉专业，物联网+智能技术',
      image: '/next.svg',
      href: '/specialties/iot',
      icon: '📱',
    },
    {
      id: 5,
      name: '康复治疗技术',
      description: '热门就业专业，康复医疗领域',
      image: '/vercel.svg',
      href: '/specialties/rehabilitation',
      icon: '⚕️',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">品牌特色专业</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            仙桃职业学院拥有多个国家级和省级重点专业，为学生提供优质的职业教育
          </p>
        </div>

        {/* 移动端专业分类标签（在小屏幕显示） */}
        <div className="lg:hidden mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveTab('all')}
            >
              全部专业
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'medical' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveTab('medical')}
            >
              医学类
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'tech' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setActiveTab('tech')}
            >
              技术类
            </button>
          </div>
        </div>

        {/* 桌面端专业分类标签 */}
        <div className="hidden lg:flex justify-center mb-8 space-x-4">
          <button 
            className={`px-6 py-2 rounded-full text-base font-medium transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            全部专业
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-base font-medium transition-all ${activeTab === 'medical' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('medical')}
          >
            医学类
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-base font-medium transition-all ${activeTab === 'tech' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('tech')}
          >
            技术类
          </button>
        </div>

        {/* 使用优化的响应式卡片网格布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {specialties.map((specialty, index) => (
                <ResponsiveCard
                key={specialty.id}
                hoverable={true}
                clickable={false}
                padding="none"
                shadow="medium"
                borderRadius="large"
                className="overflow-hidden flex flex-col h-full"
              >
                <Link
                  href={specialty.href}
                  className="group relative overflow-hidden block h-full flex flex-col"
                  onMouseEnter={() => setHoveredId(specialty.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-label={`${specialty.name}专业详情`}
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70 z-10" />
                    <Image
                      src={specialty.image}
                      alt={specialty.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 3} // 优化加载性能
                    />
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
                      <span className="text-2xl sm:text-3xl mb-1 block">{specialty.icon}</span>
                      <h3 className="text-base sm:text-xl font-bold text-white">{specialty.name}</h3>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 flex-grow">{specialty.description}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      查看详情
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ResponsiveCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtySection;