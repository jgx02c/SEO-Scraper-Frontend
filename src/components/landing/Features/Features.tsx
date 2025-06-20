// components/landing/Features/Features.tsx
import { featureData } from "./data";
import { useEffect, useRef } from "react";

export const Features = () => {
  const { title, description, features } = featureData;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const cards = containerRef.current.querySelectorAll('.parallax-card');
      const scrolled = window.pageYOffset;
      
      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features Grid with Parallax */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="parallax-card group relative p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/50 hover:border-blue-300/50 transition-all duration-500 hover:shadow-xl shadow-lg shadow-slate-900/5 hover:-translate-y-2"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Premium gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/60 group-hover:to-cyan-50/40 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200/50 flex items-center justify-center group-hover:from-blue-200 group-hover:to-cyan-200 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                {/* Text */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Premium shine effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-blue-50/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-700 mb-6 font-medium">
            Everything you need to grow your organic traffic
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-600">
            <span className="flex items-center font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 shadow-sm"></span>
              No long-term contracts
            </span>
            <span className="flex items-center font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-sm"></span>
              14-day free trial
            </span>
            <span className="flex items-center font-medium">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 shadow-sm"></span>
              Setup in under 5 minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};