import { useState } from 'react';
import { X, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface GenerateModalProps {
  onClose: () => void;
  onGenerate: (markdown: string) => void;
}

const PROXY_URL = 'https://docforge-proxy.az9szssk85unq-aqadv2.workers.dev/generate';

export default function GenerateModal({ onClose, onGenerate }: GenerateModalProps) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!projectName.trim() || !description.trim()) {
      toast.error('Please provide project name and description');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName, description, language }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `API error: ${response.status}`);
      }
      const data = await response.json();
      if (data.markdown) {
        onGenerate(data.markdown);
        toast.success('README generated successfully');
        onClose();
      } else {
        toast.error('No content generated');
      }
    } catch (error) {
      console.error(error);
      toast.error(`Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="glass rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Generate README with AI
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-2"
              placeholder="My Awesome Project"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-2"
              placeholder="Briefly describe what your project does..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-2"
            >
              <option>English</option>
              <option>Persian</option>
              <option>Arabic</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}