import React from 'react';
import './Button.css';

const Button = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) => {

  //default styles
  const baseClass = 'btn';

  const variants = {
    primary: 'btn-primary',
    link: 'btn-link'
  };

  const disabledClass = disabled ? 'btn-disabled' : '';

  return (
    <button
      type={type}
      className={`${baseClass} ${variants[variant]} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
