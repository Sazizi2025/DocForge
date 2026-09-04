import { X } from 'lucide-react';

interface QualityModalProps {
  markdown: string;
  onClose: () => void;
}

interface QualityItem {
  label: string;
  passed: boolean;
  suggestion: string;
}

function analyzeMarkdown(markdown: string): { items: QualityItem[]; score: number } {
  const items: QualityItem[] = [];

  // 1. Title (H1)
  const hasH1 = /^#\s+.+$/m.test(markdown);
  items.push({
    label: 'Title (H1)',
    passed: hasH1,
    suggestion: 'Add a top-level heading (# Title) at the beginning.',
  });

  // 2. Description after title
  const hasDescription = /^#\s+.+\n\n[\s\S]{20,}/m.test(markdown);
  items.push({
    label: 'Project description',
    passed: hasDescription,
    suggestion: 'Add a short paragraph describing your project right after the title.',
  });

  // 3. Badges
  const hasBadges = /!\[.*?\]\(https:\/\/img\.shields\.io\/.*?\)/.test(markdown);
  items.push({
    label: 'Badges (shields.io)',
    passed: hasBadges,
    suggestion: 'Add badges using the badge generator (e.g., build status, license).',
  });

  // 4. Installation
  const hasInstallation = /^##\s+Installation/mi.test(markdown);
  items.push({
    label: 'Installation section',
    passed: hasInstallation,
    suggestion: 'Add an "Installation" section with commands to set up the project.',
  });

  // 5. Usage
  const hasUsage = /^##\s+Usage/mi.test(markdown);
  items.push({
    label: 'Usage section',
    passed: hasUsage,
    suggestion: 'Add a "Usage" section with examples or screenshots.',
  });

  // 6. Contributing
  const hasContributing = /^##\s+Contributing/mi.test(markdown);
  items.push({
    label: 'Contributing section',
    passed: hasContributing,
    suggestion: 'Add a "Contributing" section explaining how others can contribute.',
  });

  // 7. License
  const hasLicense = /^##\s+License/mi.test(markdown);
  items.push({
    label: 'License section',
    passed: hasLicense,
    suggestion: 'Add a "License" section with the project license.',
  });

  // 8. Table of Contents
  const hasTOC = /<details>[\s\S]*?<summary>Table of Contents<\/summary>/i.test(markdown) ||
                 /^##\s+Table of Contents/mi.test(markdown);
  items.push({
    label: 'Table of Contents',
    passed: hasTOC,
    suggestion: 'Add a table of contents for easy navigation.',
  });

  // 9. Code blocks
  const hasCodeBlock = /```[\s\S]*?```/.test(markdown);
  items.push({
    label: 'Code examples',
    passed: hasCodeBlock,
    suggestion: 'Include code snippets to demonstrate usage.',
  });

  // 10. Images
  const hasImages = /!\[[^\]]*\]\([^)]+\)/.test(markdown) && !hasBadges;
  items.push({
    label: 'Screenshots/images',
    passed: hasImages,
    suggestion: 'Add screenshots or diagrams to make your README more engaging.',
  });

  const passedCount = items.filter((item) => item.passed).length;
  const score = Math.round((passedCount / items.length) * 100);
  return { items, score };
}

export default function QualityModal({ markdown, onClose }: QualityModalProps) {
  const { items, score } = analyzeMarkdown(markdown);
  const scoreColor = score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="glass rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">README Quality Check</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mb-6">
          <span className={`text-4xl font-bold ${scoreColor}`}>{score}%</span>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quality Score</p>
        </div>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                item.passed ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
              }`}>
                {item.passed ? (
                  <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </span>
              <div>
                <p className={`text-sm font-medium ${item.passed ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {item.label}
                </p>
                {!item.passed && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.suggestion}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}