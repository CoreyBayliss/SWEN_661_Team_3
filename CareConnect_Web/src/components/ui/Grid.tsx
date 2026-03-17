import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Grid({ children, cols = { mobile: 1, tablet: 2, desktop: 3 }, gap = 'md', className = '' }: GridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const mobileColsClass = cols.mobile ? `grid-cols-${cols.mobile}` : 'grid-cols-1';
  const tabletColsClass = cols.tablet ? `md:grid-cols-${cols.tablet}` : '';
  const desktopColsClass = cols.desktop ? `lg:grid-cols-${cols.desktop}` : '';

  return (
    <div className={`grid ${mobileColsClass} ${tabletColsClass} ${desktopColsClass} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Container({ children, maxWidth = 'xl', className = '' }: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 md:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}

interface RowProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Row({ children, align = 'start', justify = 'start', gap = 'md', className = '' }: RowProps) {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div className={`flex ${alignClasses[align]} ${justifyClasses[justify]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

interface ColProps {
  children: React.ReactNode;
  span?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export function Col({ children, span, className = '' }: ColProps) {
  const mobileSpanClass = span?.mobile ? `col-span-${span.mobile}` : '';
  const tabletSpanClass = span?.tablet ? `md:col-span-${span.tablet}` : '';
  const desktopSpanClass = span?.desktop ? `lg:col-span-${span.desktop}` : '';

  return (
    <div className={`${mobileSpanClass} ${tabletSpanClass} ${desktopSpanClass} ${className}`}>
      {children}
    </div>
  );
}
