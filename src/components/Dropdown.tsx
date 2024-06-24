import { useRef, useState } from "react";
import { ChevronDown } from "react-feather";
import { useClickOutside } from "../hooks";

export interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  handleSelect: (option: Option) => void;
}

export function Dropdown({ label, options, handleSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(() => setIsOpen(false), dropdownRef);

  const handleDropdownClick = () => setIsOpen((isOpen) => !isOpen);

  const handleOptionClick = (option: Option) => {
    handleSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="bg-gray-100 rounded-sm my-4">
      <button
        onClick={handleDropdownClick}
        className="dropdown-option flex items-center justify-between"
      >
        {label || "Select"} <ChevronDown className="ml-2" />
      </button>
      {isOpen &&
        options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option)}
            className="dropdown-option"
          >
            {option.label}
          </button>
        ))}
    </div>
  );
}
