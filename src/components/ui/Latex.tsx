import React, { useMemo } from 'react';
import katex from 'katex';

interface LatexProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const Latex: React.FC<LatexProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`katex-block overflow-x-auto py-1 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`katex-inline inline-flex items-center ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
