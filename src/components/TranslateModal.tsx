import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TranslateModalProps {
  onClose: () => void;
  markdown: string;
  selectedText: string;
  onApplyTranslation: (translated: string, mode: 'full' | 'selection') => void;
}

const RTL_LANGUAGES = new Set(['fa', 'ar', 'ur', 'he', 'ps']);

// ---------- توابع کمکی (بدون تغییر از قبل) ----------
const isCodeFence = (line: string): boolean => {
  const trimmed = line.trim();
  return trimmed.startsWith('```') || trimmed.startsWith('~~~');
};

function splitMarkdownBlocks(markdown: string): { type: 'code' | 'html' | 'text'; content: string }[] {
  const lines = markdown.split('\n');
  const blocks: { type: 'code' | 'html' | 'text'; content: string }[] = [];
  let currentBlock = '';
  let inCodeBlock = false;
  let inHtmlBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (isCodeFence(line)) {
      if (inCodeBlock) {
        currentBlock += line + '\n';
        blocks.push({ type: 'code', content: currentBlock.trimEnd() });
        currentBlock = '';
        inCodeBlock = false;
      } else {
        if (currentBlock.trim()) {
          blocks.push({ type: 'text', content: currentBlock.trimEnd() });
          currentBlock = '';
        }
        currentBlock += line + '\n';
        inCodeBlock = true;
      }
      continue;
    }

    if (!inCodeBlock && /^<\/?[a-zA-Z][^>]*>/.test(trimmed)) {
      if (currentBlock.trim() && !inHtmlBlock) {
        blocks.push({ type: 'text', content: currentBlock.trimEnd() });
        currentBlock = '';
      }
      inHtmlBlock = true;
      currentBlock += line + '\n';
      if (/<\/[a-zA-Z][^>]*>$/.test(trimmed)) {
        blocks.push({ type: 'html', content: currentBlock.trimEnd() });
        currentBlock = '';
        inHtmlBlock = false;
      }
      continue;
    }

    if (inHtmlBlock) {
      currentBlock += line + '\n';
      if (/<\/[a-zA-Z][^>]*>$/.test(trimmed)) {
        blocks.push({ type: 'html', content: currentBlock.trimEnd() });
        currentBlock = '';
        inHtmlBlock = false;
      }
      continue;
    }

    currentBlock += line + '\n';
  }

  if (currentBlock.trim()) {
    if (inCodeBlock) {
      blocks.push({ type: 'code', content: currentBlock.trimEnd() });
    } else if (inHtmlBlock) {
      blocks.push({ type: 'html', content: currentBlock.trimEnd() });
    } else {
      blocks.push({ type: 'text', content: currentBlock.trimEnd() });
    }
  }

  return blocks;
}

function chunkText(text: string, maxLen = 450): string[] {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > maxLen) {
    let splitAt: number;
    const searchStart = Math.floor(maxLen * 4 / 5);
    const searchArea = remaining.slice(searchStart, maxLen);
    const lastNewline = searchArea.lastIndexOf('\n');
    const lastSpace = searchArea.lastIndexOf(' ');

    if (lastNewline !== -1) {
      splitAt = searchStart + lastNewline + 1;
    } else if (lastSpace !== -1) {
      splitAt = searchStart + lastSpace + 1;
    } else {
      splitAt = maxLen;
    }

    chunks.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }

  if (remaining) chunks.push(remaining);
  return chunks;
}

async function translateChunk(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.responseData && data.responseData.translatedText) {
    let translated = data.responseData.translatedText;
    translated = translated
      .replace(/&#10;/g, '\n')
      .replace(/&#13;/g, '\r')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
    return translated;
  } else {
    throw new Error('Translation failed: unexpected response');
  }
}

async function translateMarkdown(
  markdown: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const blocks = splitMarkdownBlocks(markdown);
  const translatedBlocks: string[] = [];

  for (const block of blocks) {
    if (block.type === 'code' || block.type === 'html') {
      translatedBlocks.push(block.content);
    } else {
      const chunks = chunkText(block.content, 450);
      const translatedChunks: string[] = [];
      for (const chunk of chunks) {
        const translated = await translateChunk(chunk, sourceLang, targetLang);
        translatedChunks.push(translated);
      }
      translatedBlocks.push(translatedChunks.join(' '));
    }
  }

  let translated = translatedBlocks.join('\n\n');

  if (RTL_LANGUAGES.has(targetLang)) {
    translated = `<div dir="rtl">\n${translated}\n</div>`;
  }

  return translated;
}

export default function TranslateModal({ onClose, markdown, selectedText, onApplyTranslation }: TranslateModalProps) {
  const [targetLang, setTargetLang] = useState('fa');
  const [sourceLang, setSourceLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [translateMode, setTranslateMode] = useState<'full' | 'selection'>(
    selectedText.trim() ? 'selection' : 'full'
  );

  const handleTranslate = async () => {
    const inputText = translateMode === 'selection' ? selectedText : markdown;

    if (!inputText.trim()) {
      toast.error('No text to translate');
      return;
    }
    setLoading(true);
    try {
      const translated = await translateMarkdown(inputText, sourceLang, targetLang);
      onApplyTranslation(translated, translateMode);
      toast.success('Translation completed');
      onClose();
    } catch (error) {
      toast.error('Translation failed: network error or invalid response');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
      <div className="glass rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Translate README</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">From</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-2"
              >
                <option value="en">English</option>
                <option value="fa">Persian</option>
                <option value="ar">Arabic</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh-CN">Chinese (Simplified)</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">To</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-300/50 dark:border-gray-600/50 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-2"
              >
                <option value="en">English</option>
                <option value="fa">Persian</option>
                <option value="ar">Arabic</option>
                <option value="ur">Urdu</option>
                <option value="he">Hebrew</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh-CN">Chinese (Simplified)</option>
              </select>
            </div>
          </div>

          {/* گزینه انتخاب دامنه ترجمه */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="translate-selection"
              checked={translateMode === 'selection'}
              onChange={(e) => setTranslateMode(e.target.checked ? 'selection' : 'full')}
              disabled={!selectedText.trim()}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <label htmlFor="translate-selection" className="text-sm text-gray-700 dark:text-gray-300">
              Translate only selected text
            </label>
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}