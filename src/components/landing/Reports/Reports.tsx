// components/landing/Reports/Reports.tsx
import  SEOReportPreview  from "../../SEOReportPreview";
import { reportsData } from "./data";

export const Reports = () => {
  const { title, description } = reportsData;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        <SEOReportPreview />
      </div>
    </section>
  );
};