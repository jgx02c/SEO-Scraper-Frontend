import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewProps {
  stats?: any;
}

const OverviewSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-8 w-32 bg-gray-600" />
              <Skeleton className="h-4 w-16 bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewSkeleton;