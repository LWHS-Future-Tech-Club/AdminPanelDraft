import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Search, ArrowUpDown } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export function MessageTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sarah Johnson',
      recipient: 'Michael Chen',
      message: 'You are doing an amazing job! Keep up the great work!',
      category: 'Encouragement',
      status: 'approved',
      date: '2025-12-01',
    },
    {
      id: '2',
      sender: 'Emma Wilson',
      recipient: 'David Brown',
      message: 'Thank you for being such a supportive friend. I appreciate you!',
      category: 'Gratitude',
      status: 'approved',
      date: '2025-12-01',
    },
    {
      id: '3',
      sender: 'Lisa Anderson',
      recipient: 'John Smith',
      message: 'Your kindness brightens my day every time we talk.',
      category: 'Support',
      status: 'pending',
      date: '2025-12-01',
    },
    {
      id: '4',
      sender: 'James Miller',
      recipient: 'Emily Davis',
      message: 'Congratulations on your achievement! You earned it!',
      category: 'Celebration',
      status: 'pending',
      date: '2025-11-30',
    },
    {
      id: '5',
      sender: 'Sophia Martinez',
      recipient: 'Oliver Taylor',
      message: 'Believe in yourself. You have what it takes to succeed!',
      category: 'Inspiration',
      status: 'approved',
      date: '2025-11-30',
    },
  ]);

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, status } : msg));
  };

  type SortField = 'sender' | 'recipient' | 'message' | 'category' | 'status' | 'date';

  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedMessages = [...messages].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const filteredMessages = sortedMessages.filter(msg =>
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">All Messages</h2>
          <div className="flex gap-2">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="date">Sort by: Date</option>
              <option value="sender">Sort by: Sender</option>
              <option value="recipient">Sort by: Recipient</option>
              <option value="category">Sort by: Category</option>
              <option value="status">Sort by: Status</option>
            </select>
            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search messages..."
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
              <th className="px-6 py-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('sender')}>Sender</th>
              <th className="px-6 py-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('recipient')}>Recipient</th>
              <th className="px-6 py-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('message')}>Message</th>
              <th className="px-6 py-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('category')}>Category</th>
              <th className="px-6 py-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
              <th className="px-6 py-3 text-left text-gray-600 cursor-pointer" onClick={() => handleSort('date')}>Date</th>
              <th className="px-6 py-3 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <tr key={message.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{message.sender}</td>
                <td className="px-6 py-4 text-gray-900">{message.recipient}</td>
                <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                  {message.message}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {message.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      message.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : message.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{message.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    {message.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(message.id, 'approved')}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => updateStatus(message.id, 'rejected')}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-gray-200 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredMessages.length} of {messages.length} messages
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