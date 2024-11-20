import React, { useState } from "react";
import { down_arrow } from "../../assets";
import "./dropdown.css";

const Dropdown = ({ options, label, icon, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {icon && <span className="dropdown-icon">{icon}</span>}
        <div className="dropdown-value-container">
          <span className="dropdown-label">{selectedOption || label}</span>
          <span className="dropdown-arrow">
            <img src={down_arrow} alt="down icon" />
          </span>
        </div>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                option === selectedOption ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
