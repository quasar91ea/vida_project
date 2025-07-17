/** @jsxRuntime classic */
import * as React from 'react';

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

export const Icon = ({ children, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {children}
  </svg>
);