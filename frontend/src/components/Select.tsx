import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  children: React.ReactNode;
};

const Select: React.FC<SelectProps> = ({ label, id, children, className, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className || ''}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
