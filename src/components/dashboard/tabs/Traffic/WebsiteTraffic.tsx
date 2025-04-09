export const WebsiteTraffic = ({ 
  data, 
  timeRange = "7d" 
}: { 
  data: any; 
  timeRange?: string 
}) => {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Website Traffic</h2>
        <div className="bg-gray-800/50 rounded-lg p-4">
          Website Traffic Content for {timeRange}
        </div>
      </div>
    );
  };