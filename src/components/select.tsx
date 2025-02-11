import React from "react";

interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
    >
      {children}
    </select>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};
