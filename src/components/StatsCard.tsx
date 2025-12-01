import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'positive' | 'negative';
}

export function StatsCard({ title, value, icon: Icon, change, changeType }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            changeType === 'positive'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-gray-500 mb-1">{title}</h3>
      <p className="text-gray-900">{value}</p>
    </div>
  );
}
