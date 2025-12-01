import { useState } from 'react';
import { Mail, Ban, CheckCircle, Search, ArrowUpDown, Trash2, ShieldCheck, ShieldOff } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  messagesSent: number;
  messagesReceived: number;
  joinDate: string;
  status: 'active' | 'banned';
  role: 'user' | 'admin';
}

type SortField = 'name' | 'email' | 'messagesSent' | 'messagesReceived' | 'joinDate';
type SortDirection = 'asc' | 'desc';

export function UserTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      messagesSent: 45,
      messagesReceived: 38,
      joinDate: '2025-10-15',
      status: 'active',
      role: 'user',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      messagesSent: 67,
      messagesReceived: 52,
      joinDate: '2025-09-22',
      status: 'active',
      role: 'admin',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      messagesSent: 34,
      messagesReceived: 41,
      joinDate: '2025-11-03',
      status: 'active',
      role: 'user',
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david.b@email.com',
      messagesSent: 23,
      messagesReceived: 29,
      joinDate: '2025-11-18',
      status: 'active',
      role: 'user',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.a@email.com',
      messagesSent: 89,
      messagesReceived: 76,
      joinDate: '2025-08-07',
      status: 'active',
      role: 'user',
    },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'banned' as const : 'active' as const }
        : user
    ));
  };

  const toggleAdminRole = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, role: user.role === 'admin' ? 'user' as const : 'admin' as const }
        : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    if (sortField === 'name') {
      // Split by space and get first or last name
      const aNames = a.name.split(' ');
      const bNames = b.name.split(' ');
      aValue = aNames[0]; // First name
      bValue = bNames[0];
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">All Users</h2>
          <div className="flex gap-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="name">Sort by: First Name</option>
              <option value="email">Sort by: Email</option>
              <option value="messagesSent">Sort by: Messages Sent</option>
              <option value="messagesReceived">Sort by: Messages Received</option>
              <option value="joinDate">Sort by: Join Date</option>
            </select>
            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Export Users
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-gray-600">Messages Sent</th>
              <th className="px-6 py-3 text-left text-gray-600">Messages Received</th>
              <th className="px-6 py-3 text-left text-gray-600">Join Date</th>
              <th className="px-6 py-3 text-left text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-gray-600">Role</th>
              <th className="px-6 py-3 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-gray-900">{user.messagesSent}</td>
                <td className="px-6 py-4 text-gray-900">{user.messagesReceived}</td>
                <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`p-1 rounded transition-colors ${
                        user.status === 'active'
                          ? 'text-orange-600 hover:bg-orange-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                    >
                      {user.status === 'active' ? (
                        <Ban className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleAdminRole(user.id)}
                      className={`p-1 rounded transition-colors ${
                        user.role === 'admin'
                          ? 'text-gray-600 hover:bg-gray-50'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                      title={user.role === 'admin' ? 'Demote from Admin' : 'Promote to Admin'}
                    >
                      {user.role === 'admin' ? (
                        <ShieldOff className="w-5 h-5" />
                      ) : (
                        <ShieldCheck className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-gray-200 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}