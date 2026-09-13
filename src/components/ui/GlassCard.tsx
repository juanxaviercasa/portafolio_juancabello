import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  accentBorder?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  interactive = false,
  accentBorder = false,
  ...props
}) => {
  return (
    <div
      className={`
        rounded-2xl
        ${interactive ? 'glass-panel-interactive cursor-pointer' : 'glass-panel'}
        ${
          accentBorder
            ? 'border-blue-500/40 shadow-xl shadow-blue-500/10 dark:border-cyan-500/40 dark:shadow-[0_0_25px_-5px_rgba(56,189,248,0.15)] ring-1 ring-blue-500/20 dark:ring-cyan-400/20'
            : ''
        }
        p-6 sm:p-8
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
