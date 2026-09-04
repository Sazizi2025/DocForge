import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface BadgeModalProps {
  onClose: () => void;
  onAddBadge: (badgeMarkdown: string) => void;
}

export default function BadgeModal({ onClose, onAddBadge }: BadgeModalProps) {
  const [label, setLabel] = useState('build');
  const [message, setMessage] = useState('passing');
  const [color, setColor] = useState('green');
  const [style, setStyle] = useState('flat');

  const handleGenerate = () => {
    if (!label.trim() || !message.trim()) {
      toast.error('Label and message are required');
      return;
    }
    const badgeMarkdown = `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}?style=${style})`;
    onAddBadge(badgeMarkdown);
    toast.success('Badge added to README');
    onClose();
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="glass rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add Badge</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="flat">flat</option>
                <option value="flat-square">flat-square</option>
                <option value="plastic">plastic</option>
                <option value="for-the-badge">for-the-badge</option>
                <option value="social">social</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl">
              Cancel
            </button>
            <button onClick={handleGenerate} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl">
              Add Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}