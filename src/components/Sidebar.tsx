import { LayoutDashboard, MessageSquare, Users, Settings, Heart, Send, FileText, Shield } from 'lucide-react';

type View = 'dashboard' | 'messages' | 'users' | 'settings' | 'send';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'send' as View, label: 'Send Message', icon: Send },
    { id: 'messages' as View, label: 'Messages', icon: MessageSquare },
    { id: 'users' as View, label: 'Users', icon: Users },
    { id: 'settings' as View, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <Heart className="w-6 h-6 text-purple-600" fill="currentColor" />
        </div>
        <div>
          <h2 className="text-white">Kindness</h2>
          <p className="text-purple-200">Admin Panel</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-white text-purple-900'
                  : 'text-purple-100 hover:bg-purple-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6 space-y-2">
        <button className="w-full flex items-center gap-2 px-4 py-2 text-purple-100 hover:bg-purple-800 rounded-lg transition-colors text-left">
          <FileText className="w-4 h-4" />
          <span className="text-sm">Privacy Policy</span>
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-purple-100 hover:bg-purple-800 rounded-lg transition-colors text-left">
          <Shield className="w-4 h-4" />
          <span className="text-sm">Terms of Service</span>
        </button>
      </div>
    </div>
  );
}