import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ResponsiveCard from './ResponsiveCard';


interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollY, setScrollY] = useState(0);

  // 监听滚动事件，用于视差效果和动画触发
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 发展历程数据
  const timelineData: TimelineItem[] = [
    {
      year: '2001年',
      title: '学院成立',
      description: '仙桃职业学院经湖北省人民政府批准、教育部备案正式成立。'
    },
    {
      year: '2005年',
      title: '扩大规模',
      description: '学院扩建新校区，新增多个专业，在校生规模突破5000人。'
    },
    {
      year: '2010年',
      title: '评估优秀',
      description: '通过教育部人才培养工作评估，获得优秀等级。'
    },
    {
      year: '2015年',
      title: '示范建设',
      description: '被确定为湖北省优质专科高等职业院校立项建设单位。'
    },
    {
      year: '2020年',
      title: '提质升级',
      description: '入选湖北省高水平高职院校和专业建设计划。'
    },
    {
      year: '2023年',
      title: '持续发展',
      description: '学院综合实力显著提升，成为区域内重要的高等职业教育基地。'
    }
  ];



  return (
    <div className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}
          >
            学院概况
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* 导航标签 */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {[
            { id: 'overview', label: '基本情况' },
            { id: 'history', label: '发展历程' },
            { id: 'philosophy', label: '办学理念' },
            { id: 'achievements', label: '学院成就' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="min-h-[500px]">
          {/* 基本情况 */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full -z-10"></div>
                <div className="overflow-hidden rounded-2xl shadow-xl">
                  <Image 
                    src="/next.svg" // 这里使用占位图，实际应用中替换为真实的学院图片
                    alt="仙桃职业学院校园风光"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full -z-10"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">学院简介</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    仙桃职业学院创建于2001年，是经湖北省人民政府批准、教育部备案的公办全日制普通高等院校。
                    学院位于湖北省仙桃市，北依汉水，南望长江，地理位置优越，交通便利。
                  </p>
                  <p>
                    学院占地面积1000余亩，校舍建筑面积35万平方米，固定资产总值8亿元，教学仪器设备总值8000余万元，
                    图书馆藏书90余万册。现有教职工800余人，其中专任教师600余人，副高及以上职称教师200余人，
                    具有硕士及以上学位教师300余人。
                  </p>
                  <p>
                    学院设有医学院、教育学院、经济与管理学院、机械电子工程学院、计算机学院、建筑学院、
                    纺织服装学院、艺术与传媒学院、马克思主义学院等9个二级学院，开设35个专业，
                    涵盖医药卫生、教育与体育、财经商贸、装备制造、电子信息、土木建筑、轻工纺织、文化艺术等8个专业大类。
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">9</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">二级学院</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">35</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">专业设置</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 发展历程 */}
          {activeTab === 'history' && (
            <div className="relative max-w-4xl mx-auto">
              {/* 时间轴中心线 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-800 rounded-full"></div>
              
              <div className="space-y-16">
                {timelineData.map((item, index) => (
                  <div className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* 时间点 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>
                    
                    {/* 内容卡片 */}
                    <div className={`ml-0 md:ml-16 w-full md:w-5/12 ${index % 2 === 0 ? 'text-left md:text-right' : 'text-left'}`}>
                      <ResponsiveCard className="bg-white dark:bg-gray-800 shadow-xl" hoverable={true}>
                        <div className="text-blue-600 dark:text-blue-400 font-bold mb-2 text-xl">{item.year}</div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </ResponsiveCard>
                    </div>
                    
                    {/* 空白占位，保持对称 */}
                    <div className="w-full md:w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 办学理念 */}
          {activeTab === 'philosophy' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '办学使命',
                  description: '培养高素质技术技能型人才，服务地方经济社会发展，为建设现代化经济体系和实现中华民族伟大复兴的中国梦提供有力人才和技能支撑。',
                  icon: '/target.svg',
                  color: 'blue'
                },
                {
                  title: '办学愿景',
                  description: '建设特色鲜明、国内一流的高水平高职院校，成为区域内重要的技术技能人才培养基地、技术创新服务平台和文化传承创新载体。',
                  icon: '/flag.svg',
                  color: 'green'
                },
                {
                  title: '校训',
                  description: '立德正行、笃学尚能。坚持立德树人根本任务，培养学生良好的职业道德和行为习惯，注重学生知识学习和实践能力培养。',
                  icon: '/book.svg',
                  color: 'purple'
                },
                {
                  title: '办学特色',
                  description: '坚持产教融合、校企合作，深化工学结合、知行合一的人才培养模式改革，注重培养学生的创新精神和实践能力。',
                  icon: '/gear.svg',
                  color: 'orange'
                },
                {
                  title: '人才培养目标',
                  description: '培养理想信念坚定，德、智、体、美、劳全面发展，具有一定的科学文化水平，良好的人文素养、职业道德和创新意识，精益求精的工匠精神，较强的就业能力和可持续发展能力的高素质技术技能型人才。',
                  icon: '/users.svg',
                  color: 'red'
                },
                {
                  title: '发展战略',
                  description: '质量立校、特色兴校、人才强校。以提高人才培养质量为核心，以强化办学特色为重点，以加强师资队伍建设为关键，全面提升学院综合实力和办学水平。',
                  icon: '/chart.svg',
                  color: 'teal'
                }
              ].map((item, index) => (
                <div key={index}>
                  <ResponsiveCard className="h-full bg-white dark:bg-gray-800 shadow-lg group" hoverable={true}>
                    <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                      <Image 
                        src={item.icon} 
                        alt={item.title} 
                        width={32} 
                        height={32} 
                      />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </ResponsiveCard>
                </div>
              ))}
            </div>
          )}

          {/* 学院成就 */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">获得荣誉</h3>
                <div className="space-y-4">
                  {[
                    '湖北省优质专科高等职业院校立项建设单位',
                    '湖北省高水平高职院校和专业建设计划建设单位',
                    '全国卫生职业教育教学指导委员会委员单位',
                    '全国纺织服装教育学会理事单位',
                    '湖北省高等教育学会理事单位',
                    '湖北省职业教育学会副会长单位',
                    '湖北省职业教育信息化建设试点单位',
                    '湖北省文明单位（校园）'
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 text-blue-600 dark:text-blue-400 font-bold">
                        {index + 1}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">{achievement}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">教学科研成果</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">重点专业建设</h4>
                      <div className="space-y-2">
                        {[
                          { name: '护理专业', level: '国家级骨干专业' },
                          { name: '应用电子技术专业', level: '国家级骨干专业' },
                          { name: '机电一体化技术专业', level: '省级重点专业' },
                          { name: '计算机应用技术专业', level: '省级重点专业' },
                          { name: '学前教育专业', level: '省级重点专业' }
                        ].map((major, index) => (
                          <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-gray-700 dark:text-gray-300">{major.name}</span>
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">{major.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">科研项目与成果</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: '省级以上科研项目', value: '120+' },
                          { name: '专利授权', value: '200+' },
                          { name: '省级教学成果奖', value: '15+' },
                          { name: '出版教材', value: '100+' }
                        ].map((stat, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;