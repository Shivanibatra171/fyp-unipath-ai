import React from 'react';
import clsx from 'clsx';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValueLabel?: boolean;
  valueSuffix?: string;
  variant?: 'navy' | 'gold' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValueLabel = false,
  valueSuffix = '%',
  variant = 'navy',
  size = 'md',
  className
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const fillStyles = {
    navy: 'bg-[#17284A]',
    gold: 'bg-[#C79A3D]',
    green: 'bg-[#2F6B4F]',
    red: 'bg-[#B5482F]'
  };

  return (
    <div className={clsx('w-full flex flex-col gap-1.5', className)}>
      {(label || showValueLabel) && (
        <div className="flex items-center justify-between text-xs text-[#5B6472]">
          {label && <span className="font-medium text-[#17284A]">{label}</span>}
          {showValueLabel && (
            <span className="font-semibold text-[#17284A] ml-auto">
              {percentage}
              {valueSuffix}
            </span>
          )}
        </div>
      )}
      <div
        className={clsx(
          'w-full bg-[#E1E4EA] rounded-full overflow-hidden',
          sizeStyles[size]
        )}
      >
        <div
          className={clsx(
            'h-full transition-all duration-500 ease-out rounded-full',
            fillStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};
