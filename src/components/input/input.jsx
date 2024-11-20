import React from "react";
import './input.css'

const Input = (props) => {
  const { placeholder, className, type = "text",icon, ...rest } = props;
  return (
    <div className="input_container">
      <input
        type={type}
        placeholder={placeholder}
        {...rest}
        className={`input ${className}`}
      />
      {icon && <div className="input_icon">{icon}</div>}
    </div>
  );
};

export default Input;
