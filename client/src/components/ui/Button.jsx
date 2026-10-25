import React from 'react';
import './Button.css';

export const Button = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  fullWidth = true,
  className = '',
  icon = null
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${fullWidth ? 'btn-block' : ''} ${className}`}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
