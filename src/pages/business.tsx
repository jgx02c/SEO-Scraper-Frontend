import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";


interface Business {
  id: string;
  name: string;
  category: string;
  image: string;
}

const BusinessPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("https://leaps-scraper.onrender.com/get_all_businesses");
        const result = await response.json(); // Extract the full response
        setBusinesses(result.data || []); // Ensure we set the correct array
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBusinesses();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <Button className="bg-blue-600 text-white" onClick={() => router.push("/")}>
          Back to Chat
        </Button>
        <h1 className="text-2xl font-bold">Businesses</h1>
      </div>

      {loading ? (
        <p className="text-center">Loading businesses...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {businesses.map((business) => (
            <Card key={business.id} className="bg-gray-800 shadow-lg">
              <CardContent className="p-4 text-center">
                <img src={business.image} alt={business.name} className="h-32 w-full object-cover rounded-lg mb-3" />
                <h2 className="text-lg font-bold">{business.name}</h2>
                <p className="text-sm text-gray-400">{business.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessPage;
