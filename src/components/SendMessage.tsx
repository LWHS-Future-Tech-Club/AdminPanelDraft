import { useState } from 'react';
import { Send, Heart, Sparkles } from 'lucide-react';

export function SendMessage() {
  const [recipient, setRecipient] = useState('');
  const [category, setCategory] = useState('Encouragement');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message sending
    alert(`Message sent to ${recipient}!`);
    setRecipient('');
    setMessage('');
  };

  const messageTemplates = [
    "You are doing an amazing job! Keep up the great work!",
    "Thank you for being such a wonderful person. You make a difference!",
    "Your kindness and compassion inspire everyone around you.",
    "You are stronger than you know. Keep going!",
    "The world is a better place because you're in it.",
  ];

  const insertTemplate = (template: string) => {
    setMessage(template);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 mb-6 border border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-gray-900">Spread Kindness</h2>
            <p className="text-gray-600">Send a message to brighten someone's day</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-900 mb-2">
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter recipient's name or email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-900 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Encouragement">Encouragement</option>
                  <option value="Gratitude">Gratitude</option>
                  <option value="Support">Support</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Inspiration">Inspiration</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-900 mb-2">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your kindness message here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500">
                    {message.length} / 500 characters
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="anonymous" className="text-gray-900 cursor-pointer">
                  Send anonymously
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRecipient('');
                    setMessage('');
                    setIsAnonymous(false);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-gray-900">Message Templates</h3>
            </div>
            <p className="text-gray-500 mb-4">
              Click to use a template
            </p>
            <div className="space-y-3">
              {messageTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => insertTemplate(template)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-gray-600"
                >
                  "{template}"
                </button>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
            <h3 className="text-gray-900 mb-2">Tips for Kindness</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Be specific about what you appreciate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Keep it positive and uplifting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Be genuine and authentic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>A little kindness goes a long way</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
