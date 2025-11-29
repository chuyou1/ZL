import React, { useState } from 'react';
import Image from 'next/image';
import ResponsiveCard from './ResponsiveCard';
import NeumorphicButton from './NeumorphicButton';
import Link from 'next/link';
import { motion } from 'framer-motion';


interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  link: string;
  featured?: boolean;
}

const CampusServiceSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMapSection, setActiveMapSection] = useState('main');

  // 服务类别数据
  const serviceCategories: ServiceCategory[] = [
    { id: 'academic', name: '学术资源', icon: '/book.svg', color: 'blue' },
    { id: 'facilities', name: '校园设施', icon: '/building.svg', color: 'green' },
    { id: 'student', name: '学生服务', icon: '/users.svg', color: 'purple' },
    { id: 'campus', name: '校园生活', icon: '/home.svg', color: 'orange' },
    { id: 'support', name: '支持服务', icon: '/heart.svg', color: 'red' }
  ];

  // 服务项目数据
  const services: Service[] = [
    {
      id: '1',
      title: '图书馆',
      description: '学院图书馆藏书90余万册，提供图书借阅、电子资源查询、学习空间等服务。',
      icon: '/library.svg',
      category: 'academic',
      link: '/services/library',
      featured: true
    },
    {
      id: '2',
      title: '体育馆',
      description: '现代化体育馆配备篮球场、羽毛球场、乒乓球场等设施，满足师生体育锻炼需求。',
      icon: '/sports.svg',
      category: 'facilities',
      link: '/services/gym'
    },
    {
      id: '3',
      title: '学生宿舍',
      description: '设施完善的学生公寓，配备空调、独立卫生间、宽带网络等，提供舒适的住宿环境。',
      icon: '/bed.svg',
      category: 'campus',
      link: '/services/dorm'
    },
    {
      id: '4',
      title: '就业指导中心',
      description: '提供就业信息发布、职业规划咨询、简历指导、面试培训等服务，帮助学生顺利就业。',
      icon: '/briefcase.svg',
      category: 'student',
      link: '/services/career',
      featured: true
    },
    {
      id: '5',
      title: '校园食堂',
      description: '多个餐厅提供多样化的餐饮选择，满足不同口味需求，环境整洁，价格实惠。',
      icon: '/food.svg',
      category: 'campus',
      link: '/services/canteen'
    },
    {
      id: '6',
      title: '医疗服务中心',
      description: '提供基本医疗服务、健康咨询、疫苗接种等，保障师生身体健康。',
      icon: '/medical.svg',
      category: 'support',
      link: '/services/medical',
      featured: true
    },
    {
      id: '7',
      title: '计算机中心',
      description: '提供计算机机房、网络服务、技术支持等，满足教学和学生学习需求。',
      icon: '/computer.svg',
      category: 'academic',
      link: '/services/computer'
    },
    {
      id: '8',
      title: '实训基地',
      description: '各专业配套的实训基地，提供实践教学和技能训练场所。',
      icon: '/lab.svg',
      category: 'academic',
      link: '/services/workshop'
    },
    {
      id: '9',
      title: '心理咨询中心',
      description: '提供心理咨询、心理测评、心理健康教育等服务，关注学生心理健康。',
      icon: '/brain.svg',
      category: 'support',
      link: '/services/counseling'
    },
    {
      id: '10',
      title: '校园超市',
      description: '提供日常生活用品、学习文具等，方便学生购物。',
      icon: '/shopping.svg',
      category: 'campus',
      link: '/services/supermarket'
    },
    {
      id: '11',
      title: '团委学生会',
      description: '组织各类校园文化活动、社团活动，丰富学生课余生活。',
      icon: '/users.svg',
      category: 'student',
      link: '/services/student-union'
    },
    {
      id: '12',
      title: '校园安保',
      description: '24小时校园巡逻，保障校园安全，处理突发事件。',
      icon: '/shield.svg',
      category: 'support',
      link: '/services/security'
    }
  ];

  // 筛选服务项目
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 精选服务
  const featuredServices = services.filter(service => service.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1
    }
  };

  return (
    <div className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          >
            校园服务
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* 精选服务 */}
        <motion.section 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-800 dark:text-white mb-8"
            variants={itemVariants}
          >
            精选服务
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <ResponsiveCard className="h-full bg-white dark:bg-gray-800 shadow-xl group">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image 
                      src="/next.svg" // 使用占位图，实际应用中替换为真实服务图片
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <Link href={service.link}>
                          <NeumorphicButton variant="primary" size="small">
                            了解详情
                          </NeumorphicButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{service.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  </div>
                </ResponsiveCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 校园地图 */}
        <motion.section 
          className="mb-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">校园地图</h3>
            
            {/* 地图导航 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'main', label: '总览' },
                { id: 'academic', label: '教学区' },
                { id: 'dormitory', label: '宿舍区' },
                { id: 'sports', label: '运动区' },
                { id: 'administration', label: '行政区' },
                { id: 'recreation', label: '休闲区' }
              ].map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveMapSection(area.id)}
                  className={`px-4 py-2 rounded-full text-sm ${activeMapSection === area.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  {area.label}
                </button>
              ))}
            </div>
            
            {/* 地图显示区域 */}
            <div className="relative aspect-[16/9] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {/* 这里使用占位图，实际应用中可以替换为真实的校园地图或集成地图API */}
              <Image 
                src="/next.svg" 
                alt="仙桃职业学院校园地图"
                fill
                className="object-contain p-8"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-900/90 px-6 py-3 rounded-lg shadow-lg text-gray-800 dark:text-white font-medium">
                  {activeMapSection === 'main' ? '校园总览地图' : `${activeMapSection.charAt(0).toUpperCase() + activeMapSection.slice(1)}地图`}
                </div>
              </div>
              
              {/* 地图交互按钮 */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <NeumorphicButton size="small" className="w-10 h-10 p-0 rounded-full">
                  <Image src="/plus.svg" alt="放大" width={20} height={20} />
                </NeumorphicButton>
                <NeumorphicButton size="small" className="w-10 h-10 p-0 rounded-full">
                  <Image src="/minus.svg" alt="缩小" width={20} height={20} />
                </NeumorphicButton>
                <NeumorphicButton size="small" className="w-10 h-10 p-0 rounded-full">
                  <Image src="/layers.svg" alt="图层" width={20} height={20} />
                </NeumorphicButton>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/services/campus-map">
              <NeumorphicButton variant="outline">
                查看完整校园地图
              </NeumorphicButton>
            </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* 所有服务 */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
            variants={itemVariants}
          >
            所有服务
          </motion.h3>
          
          {/* 搜索和筛选 */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="搜索服务..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Image src="/search.svg" alt="搜索" width={20} height={20} />
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 flex-grow md:flex-grow-0">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCategory === 'all' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  全部服务
                </button>
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center gap-2 ${selectedCategory === category.id 
                      ? `bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-600 dark:text-${category.color}-400` 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  >
                    <Image src={category.icon} alt={category.name} width={16} height={16} />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* 服务列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const categoryInfo = serviceCategories.find(c => c.id === service.category);
              
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <ResponsiveCard className="h-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${categoryInfo?.color || 'blue'}-100 dark:bg-${categoryInfo?.color || 'blue'}-900/30 text-${categoryInfo?.color || 'blue'}-600 dark:text-${categoryInfo?.color || 'blue'}-400 group-hover:scale-110 transition-transform duration-300`}>
                          <Image src={service.icon} alt={service.title} width={24} height={24} />
                        </div>
                        <Link href={service.link}>
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            <Image src="/arrow-right.svg" alt="查看" width={20} height={20} />
                          </div>
                        </Link>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{service.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <span className={`text-xs px-3 py-1 rounded-full bg-${categoryInfo?.color || 'blue'}-100 dark:bg-${categoryInfo?.color || 'blue'}-900/30 text-${categoryInfo?.color || 'blue'}-600 dark:text-${categoryInfo?.color || 'blue'}-400`}>
                          {categoryInfo?.name || '其他服务'}
                        </span>
                        <Link href={service.link} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                          了解更多
                        </Link>
                      </div>
                    </div>
                  </ResponsiveCard>
                </motion.div>
              );
            })}
          </div>
          
          {/* 未找到结果提示 */}
          {filteredServices.length === 0 && (
            <motion.div 
              variants={itemVariants}
              className="py-16 text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                <Image src="/search.svg" alt="未找到" width={40} height={40} className="text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">未找到相关服务</h4>
              <p className="text-gray-600 dark:text-gray-400">请尝试使用其他关键词或筛选条件</p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default CampusServiceSection;