import React, { useMemo } from 'react';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: 'small' | 'medium' | 'large' | 'full';
  layout?: 'stacked' | 'horizontal' | 'grid';
  responsiveBehavior?: {
    mobile?: { layout?: 'stacked' | 'horizontal' | 'grid'; columns?: 1 | 2 };
    tablet?: { layout?: 'stacked' | 'horizontal' | 'grid'; columns?: 2 | 3 };
    desktop?: { layout?: 'stacked' | 'horizontal' | 'grid'; columns?: 3 | 4 | 5 | 6 };
  };
  fluid?: boolean;
  noBorder?: boolean;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = '',
  hoverable = false,
  clickable = false,
  onClick,
  padding = 'medium',
  shadow = 'small',
  borderRadius = 'medium',
  layout = 'stacked',
  responsiveBehavior,
  fluid = false,
  noBorder = false,
}) => {
  // 获取响应式内边距样式
  const getPaddingStyles = () => {
    const basePadding = {
      none: 'p-0',
      small: 'p-3 sm:p-3 md:p-3 lg:p-3',
      medium: 'p-3 sm:p-4 md:p-4 lg:p-4',
      large: 'p-4 sm:p-5 md:p-6 lg:p-6',
    };
    return basePadding[padding] || basePadding.medium;
  };

  // 获取响应式阴影样式
  const getShadowStyles = () => {
    switch (shadow) {
      case 'none':
        return 'shadow-none';
      case 'small':
        return 'shadow-sm hover:shadow-md transition-shadow duration-300';
      case 'medium':
        return 'shadow-md hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-900/30';
      case 'large':
        return 'shadow-lg hover:shadow-xl transition-shadow duration-300 dark:shadow-gray-900/50';
      default:
        return 'shadow-sm hover:shadow-md transition-shadow duration-300';
    }
  };

  // 获取边框圆角样式
  const getBorderRadiusStyles = () => {
    switch (borderRadius) {
      case 'small':
        return 'rounded-md';
      case 'medium':
        return 'rounded-lg';
      case 'large':
        return 'rounded-xl';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  // 获取响应式布局样式
  const getResponsiveLayoutStyles = useMemo(() => {
    if (!responsiveBehavior) return '';

    let layoutStyles = '';

    // 移动端布局
    if (responsiveBehavior.mobile) {
      const { layout: mobileLayout, columns = 1 } = responsiveBehavior.mobile;
      if (mobileLayout === 'grid') {
        layoutStyles += `grid grid-cols-${columns} gap-4 `;
      } else if (mobileLayout === 'horizontal') {
        layoutStyles += 'flex flex-col sm:flex-row ';
      }
    }

    // 平板布局
    if (responsiveBehavior.tablet) {
      const { layout: tabletLayout, columns = 2 } = responsiveBehavior.tablet;
      if (tabletLayout === 'grid') {
        layoutStyles += `md:grid-cols-${columns} `;
      } else if (tabletLayout === 'horizontal') {
        layoutStyles += 'md:flex-row ';
      }
    }

    // 桌面布局
    if (responsiveBehavior.desktop) {
      const { layout: desktopLayout, columns = 3 } = responsiveBehavior.desktop;
      if (desktopLayout === 'grid') {
        layoutStyles += `lg:grid-cols-${columns} xl:grid-cols-${columns} `;
      }
    }

    return layoutStyles.trim();
  }, [responsiveBehavior]);

  // 基础样式
  const baseStyles = `bg-white dark:bg-gray-800 ${noBorder ? '' : 'border border-gray-100 dark:border-gray-700'} ${fluid ? 'w-full' : 'max-w-full'} h-full flex flex-col`;
  
  // 交互样式
  const interactiveStyles = hoverable 
    ? 'transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]' 
    : '';
  
  // 布局样式
  const layoutStyles = layout === 'horizontal' ? 'flex flex-col sm:flex-row' : 
                      layout === 'grid' ? 'grid' : 'block';
  
  // 组合所有样式
  const cardClassName = `${baseStyles} ${getPaddingStyles()} ${getShadowStyles()} ${getBorderRadiusStyles()} ${interactiveStyles} ${layoutStyles} ${getResponsiveLayoutStyles} ${className}`;

  // 渲染内容
  const renderContent = () => (
    <div 
      className={cardClassName}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable && onClick ? onClick : undefined}
      onKeyPress={(e) => {
        if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );

  // 根据是否可点击返回不同元素
  if (clickable && onClick) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left"
        aria-label="Card content"
      >
        {renderContent()}
      </button>
    );
  }

  return renderContent();
};

export default ResponsiveCard;
