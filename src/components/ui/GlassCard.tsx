import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  accentBorder?: boolean | 'cyan' | 'purple';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  interactive = false,
  accentBorder = false,
  ...props
}) => (
  <div
    className={`${interactive ? 'glass-panel-interactive' : 'glass-panel'} ${accentBorder ? 'ring-1 ring-blue-500/30' : ''} p-5 sm:p-7 ${className}`}
    {...props}
  >
    {children}
  </div>
);
