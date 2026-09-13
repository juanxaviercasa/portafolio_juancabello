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
}) => {
  const getAccentBorderClass = () => {
    if (!accentBorder) return '';
    if (accentBorder === 'purple') {
      return 'border-purple-500/40 dark:border-purple-400/50 shadow-xl shadow-purple-500/10 dark:shadow-[0_0_30px_-5px_rgba(168,85,247,0.25)] ring-1 ring-purple-500/20 dark:ring-purple-400/30';
    }
    return 'border-blue-500/40 shadow-xl shadow-blue-500/10 dark:border-cyan-500/40 dark:shadow-[0_0_25px_-5px_rgba(56,189,248,0.15)] ring-1 ring-blue-500/20 dark:ring-cyan-400/20';
  };

  return (
    <div
      className={`
        rounded-2xl
        ${interactive ? 'glass-panel-interactive cursor-pointer' : 'glass-panel'}
        ${getAccentBorderClass()}
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
