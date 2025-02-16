import React, { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  offset = 0.2,
  className = "" 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (section) {
            const scrolled = window.scrollY;
            const speed = offset;
            const yPos = -(scrolled * speed);
            section.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ParallaxSection;