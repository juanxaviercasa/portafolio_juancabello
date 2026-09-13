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
        ${accentBorder ? 'border-cyan-500/30 shadow-[0_0_25px_-5px_rgba(56,189,248,0.15)]' : ''}
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
