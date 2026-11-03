import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 font-medium',
    md: 'text-sm px-4 py-2 gap-2 font-medium',
    lg: 'text-base px-6 py-2.5 gap-2.5 font-semibold'
  };

  const variantStyles = {
    primary:
      'bg-[#17284A] text-white hover:bg-[#0E1B33] active:bg-[#081122] focus-visible:ring-[#17284A] shadow-xs border border-[#17284A]',
    accent:
      'bg-[#C79A3D] text-[#17284A] font-semibold hover:bg-[#A67C28] hover:text-white active:bg-[#8C661D] focus-visible:ring-[#C79A3D] shadow-xs border border-[#C79A3D]',
    secondary:
      'bg-[#F0F4FA] text-[#17284A] hover:bg-[#DEE6F2] active:bg-[#CAD8EC] focus-visible:ring-[#17284A] border border-[#DEE6F2]',
    outline:
      'bg-white text-[#17284A] border border-[#E1E4EA] hover:bg-[#F5F6F9] hover:border-[#CAD0DC] active:bg-[#EAEFF7] focus-visible:ring-[#17284A]',
    ghost:
      'bg-transparent text-[#5B6472] hover:text-[#17284A] hover:bg-[#F0F4FA] active:bg-[#DEE6F2] focus-visible:ring-[#17284A]',
    danger:
      'bg-[#B5482F] text-white hover:bg-[#963720] active:bg-[#7D2C19] focus-visible:ring-[#B5482F] border border-[#B5482F]',
    success:
      'bg-[#2F6B4F] text-white hover:bg-[#24543D] active:bg-[#1A3F2D] focus-visible:ring-[#2F6B4F] border border-[#2F6B4F]'
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
