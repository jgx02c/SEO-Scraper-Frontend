// components/landing/CompetitorTracker/CompetitorTracker.tsx
import React from 'react';
import { CompetitorPreview } from './CompetitorPreview';
import { competitorData } from './data';

export const CompetitorTracker = () => {
  const { title, description } = competitorData;

  return (
    <section className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <CompetitorPreview />
      </div>
    </section>
  );
};