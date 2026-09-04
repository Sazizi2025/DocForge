import {
  Bold, Italic, Code, List, ListOrdered, Link, Image, Quote,
  Heading1, Heading2, Heading3, Badge, Table, LayoutTemplate,
  Languages, FileDown, Trash2, Sun, Moon,
  AlignLeft, AlignCenter, AlignRight,
  FilePlus2, Paintbrush, Anchor,
  CheckCircle, Sparkles
} from 'lucide-react';

interface ToolbarProps {
  markdown: string;
  setMarkdown: (value: string) => void;
  onInsert: (text: string) => void;
  onWrap: (prefix: string, suffix?: string) => void;
  onAlign: (align: 'left' | 'center' | 'right') => void;
  onOpenBadgeModal: () => void;
  onOpenTableModal: () => void;
  onOpenTemplateModal: () => void;
  onOpenTranslateModal: () => void;
  onOpenSectionModal: () => void;
  onOpenStyleModal: () => void;
  onInsertAnchor: () => void;
  onOpenQualityModal: () => void;
  onOpenGenerateModal: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Toolbar({
  markdown,
  setMarkdown,
  onInsert,
  onWrap,
  onAlign,
  onOpenBadgeModal,
  onOpenTableModal,
  onOpenTemplateModal,
  onOpenTranslateModal,
  onOpenSectionModal,
  onOpenStyleModal,
  onInsertAnchor,
  onOpenQualityModal,
  onOpenGenerateModal,
  isDark,
  onToggleDark,
}: ToolbarProps) {
  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the editor?')) {
      setMarkdown('');
      localStorage.removeItem('docforge-markdown');
    }
  };

  const tools = [
    { icon: <Heading1 className="w-4 h-4" />, action: () => onInsert('\n# '), title: 'Heading 1' },
    { icon: <Heading2 className="w-4 h-4" />, action: () => onInsert('\n## '), title: 'Heading 2' },
    { icon: <Heading3 className="w-4 h-4" />, action: () => onInsert('\n### '), title: 'Heading 3' },
    { icon: <Bold className="w-4 h-4" />, action: () => onWrap('**'), title: 'Bold' },
    { icon: <Italic className="w-4 h-4" />, action: () => onWrap('*'), title: 'Italic' },
    { icon: <Code className="w-4 h-4" />, action: () => onWrap('`'), title: 'Inline Code' },
    { icon: <List className="w-4 h-4" />, action: () => onInsert('\n- '), title: 'Unordered List' },
    { icon: <ListOrdered className="w-4 h-4" />, action: () => onInsert('\n1. '), title: 'Ordered List' },
    { icon: <Link className="w-4 h-4" />, action: () => onWrap('[', '](url)'), title: 'Link' },
    { icon: <Image className="w-4 h-4" />, action: () => onInsert('\n![alt text](image-url)'), title: 'Image' },
    { icon: <Quote className="w-4 h-4" />, action: () => onInsert('\n> '), title: 'Blockquote' },
    { icon: <AlignLeft className="w-4 h-4" />, action: () => onAlign('left'), title: 'Align Left' },
    { icon: <AlignCenter className="w-4 h-4" />, action: () => onAlign('center'), title: 'Align Center' },
    { icon: <AlignRight className="w-4 h-4" />, action: () => onAlign('right'), title: 'Align Right' },
  ];

  return (
    <div className="p-4 pb-0">
      <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">DocForge</h1>
        <div className="flex items-center space-x-1 flex-wrap">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={tool.action}
              className="toolbar-button"
              title={tool.title}
            >
              {tool.icon}
            </button>
          ))}
          <span className="mx-2 border-l border-gray-300/50 dark:border-gray-600/50 h-6"></span>
          <button onClick={onOpenBadgeModal} className="toolbar-button" title="Add Badge">
            <Badge className="w-4 h-4" />
          </button>
          <button onClick={onOpenStyleModal} className="toolbar-button" title="Text Style">
            <Paintbrush className="w-4 h-4" />
          </button>
          <button onClick={onInsertAnchor} className="toolbar-button" title="Insert Anchor">
            <Anchor className="w-4 h-4" />
          </button>
          <button onClick={onOpenTableModal} className="toolbar-button" title="Add Table">
            <Table className="w-4 h-4" />
          </button>
          <button onClick={onOpenTemplateModal} className="toolbar-button" title="Templates">
            <LayoutTemplate className="w-4 h-4" />
          </button>
          <button onClick={onOpenTranslateModal} className="toolbar-button" title="Translate">
            <Languages className="w-4 h-4" />
          </button>
          <button onClick={onOpenSectionModal} className="toolbar-button" title="Insert Section">
            <FilePlus2 className="w-4 h-4" />
          </button>
          <button onClick={onOpenQualityModal} className="toolbar-button" title="Check README Quality">
            <CheckCircle className="w-4 h-4" />
          </button>
          <button onClick={onOpenGenerateModal} className="toolbar-button" title="Generate with AI">
            <Sparkles className="w-4 h-4" />
          </button>
          <button onClick={handleDownload} className="toolbar-button" title="Download README.md">
            <FileDown className="w-4 h-4" />
          </button>
          <button onClick={handleClear} className="toolbar-button" title="Clear editor">
            <Trash2 className="w-4 h-4" />
          </button>
          <span className="mx-2 border-l border-gray-300/50 dark:border-gray-600/50 h-6"></span>
          <button onClick={onToggleDark} className="toolbar-button" title="Toggle dark mode">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}