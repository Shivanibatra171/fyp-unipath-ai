import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'accent' | 'muted';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-[#E1E4EA] shadow-xs',
    elevated: 'bg-white border border-[#DEE6F2] shadow-md hover:shadow-lg transition-shadow duration-200',
    bordered: 'bg-white border-2 border-[#17284A]',
    accent: 'bg-[#FDF7EC] border border-[#C79A3D]/40',
    muted: 'bg-[#F5F6F9] border border-[#E1E4EA]'
  };

  return (
    <div
      className={clsx(
        'rounded-[12px] overflow-hidden transition-all',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('px-5 py-4 border-b border-[#E1E4EA] flex flex-col gap-1', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={clsx('text-lg font-serif font-semibold text-[#17284A]', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={clsx('text-xs text-[#5B6472] leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('p-5', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('px-5 py-3.5 bg-[#FAFBFD] border-t border-[#E1E4EA] flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
};
