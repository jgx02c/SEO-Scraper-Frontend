import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Stats Card Skeleton
export const StatsCardSkeleton = () => (
  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
    <CardContent className="p-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24 bg-gray-700" />
        <Skeleton className="h-8 w-32 bg-gray-600" />
        <Skeleton className="h-4 w-16 bg-gray-700" />
      </div>
    </CardContent>
  </Card>
);

// Stats Grid Skeleton
export const StatsGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <StatsCardSkeleton key={i} />
    ))}
  </div>
);

// Chart Skeleton
export const ChartSkeleton = () => (
  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          <Skeleton className="h-8 w-24 bg-gray-700" />
        </div>
        <Skeleton className="h-[300px] w-full bg-gray-700" />
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-16 bg-gray-700" />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Table Skeleton
export const TableSkeleton = () => (
  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          <Skeleton className="h-8 w-24 bg-gray-700" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-8 w-32 bg-gray-700" />
              <Skeleton className="h-8 flex-1 bg-gray-700" />
              <Skeleton className="h-8 w-24 bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Overview Page Skeleton
export const OverviewSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48 bg-gray-700" />
      <Skeleton className="h-10 w-32 bg-gray-700" />
    </div>
    <StatsGridSkeleton />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <TableSkeleton />
    </div>
  </div>
);

// Analytics Page Skeleton
export const AnalyticsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48 bg-gray-700" />
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32 bg-gray-700" />
        <Skeleton className="h-10 w-32 bg-gray-700" />
      </div>
    </div>
    <ChartSkeleton />
    <TableSkeleton />
  </div>
);

// Traffic Page Skeleton
export const TrafficSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48 bg-gray-700" />
      <div className="flex gap-4">
        <Skeleton className="h-10 w-32 bg-gray-700" />
        <Skeleton className="h-10 w-32 bg-gray-700" />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
    <TableSkeleton />
  </div>
);

// List Skeleton
export const ListSkeleton = () => (
  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
    <CardContent className="p-6">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-700" />
              <Skeleton className="h-3 w-48 bg-gray-700" />
            </div>
            <Skeleton className="h-8 w-24 bg-gray-700" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Metrics Card Skeleton
export const MetricsCardSkeleton = () => (
  <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
    <CardContent className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-8 w-32 bg-gray-600" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
        </div>
        <Skeleton className="h-[100px] w-full bg-gray-700" />
      </div>
    </CardContent>
  </Card>
);