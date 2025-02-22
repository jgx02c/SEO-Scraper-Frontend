import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import  OverviewSkeleton  from './OverviewSkeletion';

interface OverviewProps {
  stats?: any;
}

export const Overview = ({ stats }: OverviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Replace with actual API call
        const response = await fetch('https://scope-fastapi-194s.onrender.com/api/dashboard/overview');
        if (!response.ok) throw new Error('Failed to fetch overview data');
        
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching overview data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (isLoading) {
    return <OverviewSkeleton />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Replace with actual stats */}
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6">
            <p>Overview Content</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};