import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { logoData } from './data';

export const LogoSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(1);
  const animationRef = useRef<number>(0); // Initialize with 0
  const lastTimeRef = useRef<number>(0); // Initialize with 0

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Clone logos for seamless loop
    const logos = slider.querySelector('.logos');
    if (!logos) return;
    const clone = logos.cloneNode(true);
    slider.appendChild(clone);

    // Smooth animation with requestAnimationFrame
    const animate = (timestamp: number) => {
      if (!slider || lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Move slider based on speed
      if (slider.scrollLeft >= logos.scrollWidth) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += speed * (elapsed / 16); // Normalize to ~60fps
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Hover effects with speed changes
    const handleMouseEnter = () => {
      setSpeed(0); // Stop on hover
    };

    const handleMouseLeave = () => {
      setSpeed(2); // Speed up when leaving
      setTimeout(() => setSpeed(1), 1000); // Return to normal speed after 1s
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (slider) {
        slider.removeEventListener('mouseenter', handleMouseEnter);
        slider.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [speed]);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="overflow-hidden whitespace-nowrap"
      >
        <div className="logos inline-flex gap-12">
          {logoData.map((logo, index) => (
            <Link
              key={index}
              href={logo.href}
              className="inline-block px-4 transform hover:scale-110 transition-transform duration-300"
            >
              <div className="relative h-8 w-32">
                <Image
                  src={logo.logo}
                  alt={logo.name}
                  fill
                  sizes="128px"
                  className="object-contain opacity-50 hover:opacity-100 transition-all duration-300"
                  priority={index < 4}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};