// components/Slider.tsx
import React from "react";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export const Slider: React.FC<SliderProps> = ({ value, onValueChange, min, max, step }) => {
  return (
    <div className="flex flex-col space-y-2">
      <input
        type="range"
        className="w-full"
        value={value}
        onChange={(e) => onValueChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
      <span className="text-white">{value.toFixed(1)}</span>
    </div>
  );
};