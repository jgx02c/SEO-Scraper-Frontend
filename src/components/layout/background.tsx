import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />
      
      {/* Vertical lines */}
      <div className="absolute inset-0" 
        style={{
          backgroundImage: `repeating-linear-gradient(to right, rgb(255 255 255 / 0.03) 0px, rgb(255 255 255 / 0.03) 1px, transparent 1px, transparent 100px)`,
        }}
      />
      
      {/* Horizontal lines */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.03) 0px, rgb(255 255 255 / 0.03) 1px, transparent 1px, transparent 100px)`,
        }}
      />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/60" />
      
      {/* Subtle animated glow effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-3/4 h-3/4 bg-indigo-500/5 rounded-full blur-2xl animate-pulse-slow transform -translate-y-1/4" />
        <div className="absolute bottom-0 -right-4 w-3/4 h-3/4 bg-blue-500/5 rounded-full blur-2xl animate-pulse-slow transform translate-y-1/4" />
      </div>
    </div>
  );
};

export default BackgroundPattern;