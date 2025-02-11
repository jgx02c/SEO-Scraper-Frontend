import React from "react";

interface SliderProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
}

export const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, step }) => {
  return (
    <div className="flex flex-col space-y-2">
      <input
        type="range"
        className="w-full"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
      <span className="text-white">{value.toFixed(1)}</span>
    </div>
  );
};
