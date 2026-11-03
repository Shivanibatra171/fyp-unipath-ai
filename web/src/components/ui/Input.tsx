import React from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftElement, rightElement, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[#17284A] tracking-wide uppercase"
          >
            {label}
            {props.required && <span className="text-[#B5482F] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3 text-[#5B6472] flex items-center pointer-events-none">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full bg-white text-sm text-[#1B1F27] placeholder:text-[#8E97A6] rounded-[8px] border transition-all duration-150 py-2.5 px-3.5',
              'focus:outline-none focus:ring-2 focus:ring-[#17284A] focus:border-transparent',
              'disabled:bg-[#F5F6F9] disabled:cursor-not-allowed disabled:text-[#8E97A6]',
              leftElement ? 'pl-10' : 'pl-3.5',
              rightElement ? 'pr-10' : 'pr-3.5',
              error
                ? 'border-[#B5482F] focus:ring-[#B5482F]'
                : 'border-[#E1E4EA] hover:border-[#CAD0DC]',
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 text-[#5B6472] flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-[#B5482F] flex items-center gap-1 mt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-[#5B6472] mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, children, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-[#17284A] tracking-wide uppercase"
          >
            {label}
            {props.required && <span className="text-[#B5482F] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'w-full bg-white text-sm text-[#1B1F27] rounded-[8px] border transition-all duration-150 py-2.5 px-3.5 pr-10 appearance-none cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-[#17284A] focus:border-transparent',
              'disabled:bg-[#F5F6F9] disabled:cursor-not-allowed',
              error
                ? 'border-[#B5482F] focus:ring-[#B5482F]'
                : 'border-[#E1E4EA] hover:border-[#CAD0DC]',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5B6472]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs font-medium text-[#B5482F]">{error}</p>}
        {helperText && !error && <p className="text-xs text-[#5B6472]">{helperText}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
