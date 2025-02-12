// components/tabs/TabNavigation.tsx
interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  leftTabs: { id: string; label: string }[];
  rightTabs: { id: string; label: string }[];
}

export const TabNavigation = ({ activeTab, onTabChange, leftTabs, rightTabs }: TabNavigationProps) => {
  return (
    <div className="flex justify-between border-b border-gray-700 mb-6">
      <div className="flex space-x-4">
        {leftTabs.map((tab) => (
          <button
            key={tab.id}
            className={`p-2 font-semibold ${
              activeTab === tab.id ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex space-x-4">
        {rightTabs.map((tab) => (
          <button
            key={tab.id}
            className={`p-2 font-semibold ${
              activeTab === tab.id ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};