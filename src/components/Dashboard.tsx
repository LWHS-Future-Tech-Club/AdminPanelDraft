import { Heart, MessageCircle, Users, TrendingUp, AlertCircle, Clock, CheckCircle, Send } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type View = 'dashboard' | 'messages' | 'users' | 'settings' | 'send';

interface DashboardProps {
  onViewChange: (view: View) => void;
}

export function Dashboard({ onViewChange }: DashboardProps) {
  const stats = [
    {
      title: 'Total Messages',
      value: '12,543',
      icon: MessageCircle,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Active Users',
      value: '3,291',
      icon: Users,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Messages Today',
      value: '847',
      icon: Heart,
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      title: 'Engagement Rate',
      value: '94.2%',
      icon: TrendingUp,
      change: '+2%',
      changeType: 'positive' as const,
    },
  ];

  const weeklyData = [
    { day: 'Mon', messages: 420, users: 145 },
    { day: 'Tue', messages: 580, users: 178 },
    { day: 'Wed', messages: 690, users: 201 },
    { day: 'Thu', messages: 520, users: 167 },
    { day: 'Fri', messages: 780, users: 224 },
    { day: 'Sat', messages: 650, users: 189 },
    { day: 'Sun', messages: 470, users: 156 },
  ];

  const categoryData = [
    { name: 'Encouragement', value: 3421, color: '#9333ea' },
    { name: 'Gratitude', value: 2847, color: '#a855f7' },
    { name: 'Support', value: 2156, color: '#c084fc' },
    { name: 'Celebration', value: 1832, color: '#d8b4fe' },
    { name: 'Inspiration', value: 1287, color: '#e9d5ff' },
  ];

  const monthlyGrowth = [
    { month: 'Jul', messages: 8200, users: 2100 },
    { month: 'Aug', messages: 9100, users: 2400 },
    { month: 'Sep', messages: 9800, users: 2650 },
    { month: 'Oct', messages: 10500, users: 2900 },
    { month: 'Nov', messages: 11200, users: 3100 },
    { month: 'Dec', messages: 12543, users: 3291 },
  ];

  const pendingActions = [
    { id: 1, type: 'message', content: 'New message from Sarah Johnson needs approval', count: 5, time: '5 min ago' },
    { id: 2, type: 'user', content: 'New user registrations pending review', count: 3, time: '12 min ago' },
    { id: 3, type: 'report', content: 'Messages flagged by profanity filter', count: 2, time: '1 hour ago' },
  ];

  const recentActivity = [
    { user: 'Sarah Johnson', action: 'sent a kindness message', time: '5 min ago', type: 'message' },
    { user: 'Michael Chen', action: 'joined the platform', time: '12 min ago', type: 'user' },
    { user: 'Emma Wilson', action: 'sent a kindness message', time: '18 min ago', type: 'message' },
    { user: 'David Brown', action: 'received 10 messages', time: '25 min ago', type: 'achievement' },
    { user: 'Lisa Anderson', action: 'sent a kindness message', time: '32 min ago', type: 'message' },
  ];

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 mb-8 text-white">
        <h3 className="mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onViewChange('send')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-colors text-left"
          >
            <Send className="w-6 h-6 mb-2" />
            <p>Send Message</p>
            <span className="text-purple-100">As Admin</span>
          </button>
          <button 
            onClick={() => onViewChange('messages')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-colors text-left"
          >
            <Clock className="w-6 h-6 mb-2" />
            <p>Review Pending</p>
            <span className="text-purple-100">5 messages</span>
          </button>
          <button 
            onClick={() => onViewChange('users')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-colors text-left"
          >
            <Users className="w-6 h-6 mb-2" />
            <p>View Users</p>
            <span className="text-purple-100">3,291 total</span>
          </button>
          <button 
            onClick={() => onViewChange('settings')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-colors text-left"
          >
            <AlertCircle className="w-6 h-6 mb-2" />
            <p>Flagged Content</p>
            <span className="text-purple-100">2 items</span>
          </button>
        </div>
      </div>

      {/* Pending Actions Alert */}
      {pendingActions.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <h3 className="text-gray-900">Action Required</h3>
          </div>
          <div className="space-y-2">
            {pendingActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    {action.count}
                  </span>
                  <span className="text-gray-900">{action.content}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">{action.time}</span>
                  <button 
                    onClick={() => onViewChange(action.type === 'message' ? 'messages' : 'users')}
                    className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="messages" stroke="#9333ea" fillOpacity={1} fill="url(#colorMessages)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Message Categories Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Message Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">6-Month Growth Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="messages" stroke="#9333ea" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className="text-gray-600">Messages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span className="text-gray-600">Users</span>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Top Contributors This Week</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', messages: 47, avatar: 'SJ', rank: 1 },
              { name: 'Michael Chen', messages: 42, avatar: 'MC', rank: 2 },
              { name: 'Emma Wilson', messages: 38, avatar: 'EW', rank: 3 },
              { name: 'Lisa Anderson', messages: 35, avatar: 'LA', rank: 4 },
              { name: 'David Brown', messages: 31, avatar: 'DB', rank: 5 },
            ].map((user) => (
              <div key={user.name} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  user.rank === 1 ? 'bg-yellow-500' : 
                  user.rank === 2 ? 'bg-gray-400' : 
                  user.rank === 3 ? 'bg-amber-600' : 
                  'bg-purple-400'
                }`}>
                  {user.rank}
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{user.name}</p>
                  <p className="text-gray-500">{user.messages} messages sent</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Recent Activity</h3>
          <button className="text-purple-600 hover:text-purple-700">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.user}</p>
                <p className="text-gray-500">{activity.action}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{activity.time}</span>
                {activity.type === 'message' && <MessageCircle className="w-4 h-4 text-purple-600" />}
                {activity.type === 'user' && <Users className="w-4 h-4 text-blue-600" />}
                {activity.type === 'achievement' && <Heart className="w-4 h-4 text-pink-600" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
