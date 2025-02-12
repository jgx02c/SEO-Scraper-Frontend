// components/tabs/CompetitorLookupTab.tsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Business {
  _id: string;
  name: string;
  description: string;
  business_id: string;
}

export const CompetitorLookupTab = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("https://leaps-scraper.onrender.com/business/get_all_businesses");
        const result = await response.json();
        setBusinesses(result.data || []);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) {
    return <p className="text-center">Loading businesses...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <Card key={business._id} className="bg-gray-800 shadow-lg cursor-pointer hover:bg-gray-700 transition">
          <CardContent className="p-4 text-center">
            <h2 className="text-lg font-bold">{business.name}</h2>
            <p className="text-sm text-gray-400">{business.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};