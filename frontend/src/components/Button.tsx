import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children, className, ...props }) => {
  const baseClasses = 'rounded-lg font-medium transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
  };

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-2.5 px-5',
    lg: 'py-3 px-6 text-lg'
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
