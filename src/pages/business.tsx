import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";

interface Business {
  _id: string;
  name: string;
  description: string;
  business_id: string;
}

const BusinessPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("https://leaps-scraper.onrender.com/get_all_businesses");
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
            <Link key={business._id} href={`/details/${business.business_id}`} passHref>
              <Card className="bg-gray-800 shadow-lg cursor-pointer hover:bg-gray-700 transition">
                <CardContent className="p-4 text-center">
                  <h2 className="text-lg font-bold">{business.name}</h2>
                  <p className="text-sm text-gray-400">{business.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessPage;
