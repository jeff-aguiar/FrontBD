import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  const baseClasses = 'bg-white p-6 rounded-xl shadow-lg';
  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : '';
  
  const combinedClasses = `${baseClasses} ${clickableClasses} ${className || ''}`;

  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
