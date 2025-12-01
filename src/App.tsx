import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MessageTable } from './components/MessageTable';
import { UserTable } from './components/UserTable';
import { Settings } from './components/Settings';
import { SendMessage } from './components/SendMessage';

type View = 'dashboard' | 'messages' | 'users' | 'settings' | 'send';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">
                {currentView === 'dashboard' && 'Dashboard'}
                {currentView === 'messages' && 'Message Management'}
                {currentView === 'users' && 'User Management'}
                {currentView === 'settings' && 'Settings'}
                {currentView === 'send' && 'Send Message'}
              </h1>
              <p className="text-gray-500 mt-1">
                {currentView === 'dashboard' && 'Welcome back! Here\'s your overview.'}
                {currentView === 'messages' && 'Manage and moderate kindness messages'}
                {currentView === 'users' && 'View and manage platform users'}
                {currentView === 'settings' && 'Configure your application settings'}
                {currentView === 'send' && 'Spread kindness by sending a message'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-900">Admin User</p>
                <p className="text-gray-500">admin@kindness.app</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white">
                AU
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {currentView === 'dashboard' && <Dashboard onViewChange={setCurrentView} />}
          {currentView === 'messages' && <MessageTable />}
          {currentView === 'users' && <UserTable />}
          {currentView === 'settings' && <Settings />}
          {currentView === 'send' && <SendMessage />}
        </main>
      </div>
    </div>
  );
}