import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface StyleModalProps {
  onClose: () => void;
  onApplyStyle: (color: string, fontSize: string) => void;
}

export default function StyleModal({ onClose, onApplyStyle }: StyleModalProps) {
  const [color, setColor] = useState('#000000');
  const [fontSize, setFontSize] = useState('16px');

  const handleApply = () => {
    if (!color.trim() && !fontSize.trim()) {
      toast.error('Please enter a color or font size');
      return;
    }
    onApplyStyle(color.trim(), fontSize.trim());
    toast.success('Style applied');
    onClose();
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="glass rounded-2xl p-6 w-full max-w-sm mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Text Style</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-2"
                placeholder="#000000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</label>
            <input
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-2"
              placeholder="e.g., 16px, 1.2em"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}