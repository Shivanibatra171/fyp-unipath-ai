import React, { useEffect } from 'react';
import clsx from 'clsx';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'success',
  title,
  message,
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#2F6B4F] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#B5482F] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#17284A] shrink-0" />
  };

  const borders = {
    success: 'border-l-4 border-l-[#2F6B4F] bg-white border-[#E1E4EA]',
    error: 'border-l-4 border-l-[#B5482F] bg-white border-[#E1E4EA]',
    info: 'border-l-4 border-l-[#17284A] bg-white border-[#E1E4EA]'
  };

  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 rounded-[8px] shadow-lg border max-w-md w-full animate-in slide-in-from-top-2 duration-200',
        borders[type]
      )}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#17284A]">{title}</h4>
        {message && <p className="text-xs text-[#5B6472] mt-0.5">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-[#5B6472] hover:text-[#17284A] p-0.5 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
