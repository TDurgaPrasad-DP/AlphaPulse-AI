
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'green' | 'blue' | 'purple';
}

const Card: React.FC<CardProps> = ({ children, className = '', glowColor }) => {
  const glowClasses = {
    green: 'hover:shadow-glow-green',
    blue: 'hover:shadow-glow-blue',
    purple: 'hover:shadow-glow-purple',
  };
  
  const glowClass = glowColor ? glowClasses[glowColor] : '';

  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-gray-600 hover:-translate-y-1 ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
