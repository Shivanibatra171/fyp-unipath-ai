import React from 'react';
import clsx from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pills' | 'segmented';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'underline'
}) => {
  if (variant === 'segmented') {
    return (
      <div
        className={clsx(
          'flex p-1 bg-[#F0F4FA] rounded-[8px] border border-[#DEE6F2] gap-1',
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={clsx(
                'flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-[6px] transition-all cursor-pointer',
                isActive
                  ? 'bg-white text-[#17284A] font-semibold shadow-xs border border-[#DEE6F2]'
                  : 'text-[#5B6472] hover:text-[#17284A] hover:bg-white/50'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={clsx(
                    'text-[10px] px-1.5 py-0.5 rounded-full',
                    isActive
                      ? 'bg-[#17284A] text-white'
                      : 'bg-[#DEE6F2] text-[#5B6472]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={clsx('border-b border-[#E1E4EA]', className)}>
      <nav className="flex space-x-6 overflow-x-auto no-scrollbar" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={clsx(
                'group inline-flex items-center gap-2 py-3 px-1 border-b-2 text-sm font-medium whitespace-nowrap cursor-pointer transition-all',
                isActive
                  ? 'border-[#17284A] text-[#17284A] font-semibold'
                  : 'border-transparent text-[#5B6472] hover:text-[#17284A] hover:border-[#CAD0DC]'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={clsx(
                    'text-[11px] px-2 py-0.5 rounded-full font-semibold',
                    isActive
                      ? 'bg-[#17284A] text-white'
                      : 'bg-[#F0F4FA] text-[#5B6472] group-hover:bg-[#DEE6F2]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
