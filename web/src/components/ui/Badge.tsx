import React from 'react';
import clsx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'navy' | 'gold' | 'green' | 'red' | 'gray' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'navy',
  size = 'md',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium'
  };

  const variantStyles = {
    navy: 'bg-[#DEE6F2] text-[#17284A] border border-[#CAD8EC]',
    gold: 'bg-[#FDF7EC] text-[#8C661D] border border-[#E9CCA0]',
    green: 'bg-[#EFF8F3] text-[#2F6B4F] border border-[#BCE1CE]',
    red: 'bg-[#FDF2F0] text-[#B5482F] border border-[#F3C4BA]',
    gray: 'bg-[#F5F6F9] text-[#5B6472] border border-[#E1E4EA]',
    outline: 'bg-white text-[#17284A] border border-[#CAD0DC]'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full whitespace-nowrap leading-none transition-colors',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
