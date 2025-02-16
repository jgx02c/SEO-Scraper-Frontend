// components/landing/CTA/CTA.tsx
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ctaData } from "./data";

export const CTA = () => {
  const router = useRouter();
  const { 
    title, 
    description, 
    primaryButton, 
    secondaryButton, 
    features,
    stats 
  } = ctaData;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-indigo-500/10 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Highlight Badge */}
          <div className="inline-block px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-300 mb-8 text-sm font-medium">
            Trusted by industry leaders
          </div>

          {/* Main Content */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {description}
          </p>

          {/* Feature Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-white font-medium mb-2">{feature.title}</div>
                <div className="text-gray-400 text-sm">{feature.description}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => router.push(primaryButton.href)} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg transition-all group"
            >
              <span>{primaryButton.text}</span>
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
                →
              </span>
            </Button>
            {secondaryButton && (
              <Button 
                onClick={() => router.push(secondaryButton.href)}
                variant="outline" 
                className="border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700 px-8 py-6 text-lg rounded-lg transition-all backdrop-blur-sm"
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>

          {/* Stats Section */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-700/50 pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};