// components/dashboard/tabs/Overview/Overview.tsx
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Users, 
  BarChart2, 
  Radio,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <Card className="bg-gray-800/50 border-gray-700 p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="h-12 w-12 rounded-full bg-indigo-600/10 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {change > 0 ? (
        <ArrowUp className="h-4 w-4 text-green-500" />
      ) : (
        <ArrowDown className="h-4 w-4 text-red-500" />
      )}
      <span className={`ml-1 text-sm ${
        change > 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        {Math.abs(change)}%
      </span>
      <span className="ml-2 text-sm text-gray-400">vs last month</span>
    </div>
  </Card>
);

export const Overview = () => {
  const stats = [
    {
      title: "Total Website Traffic",
      value: "48,325",
      change: 12,
      icon: <LineChart className="h-6 w-6 text-indigo-400" />
    },
    {
      title: "Social Engagement",
      value: "24,589",
      change: -2.5,
      icon: <Users className="h-6 w-6 text-indigo-400" />
    },
    {
      title: "SEO Score",
      value: "85/100",
      change: 5,
      icon: <BarChart2 className="h-6 w-6 text-indigo-400" />
    },
    {
      title: "Active Ads",
      value: "12",
      change: 8,
      icon: <Radio className="h-6 w-6 text-indigo-400" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
        <p className="text-gray-400 mt-1">Monitor your key metrics and performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="text-gray-400">Activity content will go here</div>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <div className="text-gray-400">Quick actions will go here</div>
          </div>
        </Card>
      </div>
    </div>
  );
};