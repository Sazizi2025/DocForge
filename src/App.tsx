import { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import BadgeModal from './components/BadgeModal';
import TableModal from './components/TableModal';
import TemplateModal from './components/TemplateModal';
import TranslateModal from './components/TranslateModal';
import SectionModal from './components/SectionModal';
import StyleModal from './components/StyleModal';
import QualityModal from './components/QualityModal';
import GenerateModal from './components/GenerateModal';

function App() {
  const [markdown, setMarkdown] = useState(() => {
    const saved = localStorage.getItem('docforge-markdown');
    return saved !== null ? saved : '# Welcome to DocForge\n\nStart writing your README...';
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('docforge-dark');
    return saved ? saved === 'true' : false;
  });

  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [translateSelectedText, setTranslateSelectedText] = useState('');

  const [editorWidth, setEditorWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('docforge-markdown', markdown);
    }, 300);
    return () => clearTimeout(timer);
  }, [markdown]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('docforge-dark', isDark.toString());
  }, [isDark]);

  const insertAtCursor = (text: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = markdown.substring(0, start) + text + markdown.substring(end);
    setMarkdown(newValue);
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
      textarea.focus();
    });
  };

  const wrapSelection = (prefix: string, suffix: string = prefix) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdown.substring(start, end);
    const newText = prefix + selected + suffix;
    const newValue = markdown.substring(0, start) + newText + markdown.substring(end);
    setMarkdown(newValue);
    requestAnimationFrame(() => {
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = start + prefix.length + selected.length;
      textarea.focus();
    });
  };

  const applyAlignment = (align: 'left' | 'center' | 'right') => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let selected = markdown.substring(start, end).trim();

    if (!selected) return;

    const divRegex = /^<div\s+align=["']?(left|center|right)["']?>\s*([\s\S]*?)\s*<\/div>$/i;
    const match = selected.match(divRegex);
    if (match) {
      selected = match[2];
    }

    const headingRegex = /^(#{1,6})\s+(.*)$/;
    const headingMatch = selected.match(headingRegex);
    if (headingMatch) {
      const level = headingMatch[1].length;
      selected = `<h${level}>${headingMatch[2]}</h${level}>`;
    }

    const newText = `<div align="${align}">${selected}</div>`;
    const newValue = markdown.substring(0, start) + newText + markdown.substring(end);
    setMarkdown(newValue);

    requestAnimationFrame(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + newText.length;
      textarea.focus();
    });
  };

  const applyStyle = (color: string, fontSize: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let selected = markdown.substring(start, end);

    if (!selected.trim()) {
      toast.error('Please select some text first');
      return;
    }

    // اگر متن انتخاب‌شده دقیقاً یک span با style باشد، آن را باز می‌کنیم
    const spanRegex = /^<span\s+style="([^"]*)"\s*>([\s\S]*?)<\/span>$/i;
    const spanMatch = selected.match(spanRegex);
    if (spanMatch) {
      selected = spanMatch[2]; // محتوای داخلی
    }

    // ساخت استایل جدید
    let style = '';
    if (color) style += `color:${color};`;
    if (fontSize) style += `font-size:${fontSize};`;

    if (!style) return;

    const newText = `<span style="${style}">${selected}</span>`;
    const newValue = markdown.substring(0, start) + newText + markdown.substring(end);
    setMarkdown(newValue);
    requestAnimationFrame(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + newText.length;
      textarea.focus();
    });
  };

  const handleAddBadge = (badgeMarkdown: string) => {
    setMarkdown((prev) => prev.trimEnd() + '\n\n' + badgeMarkdown + '\n');
  };

  const handleAddTable = (tableMarkdown: string) => {
    setMarkdown((prev) => prev.trimEnd() + '\n\n' + tableMarkdown + '\n');
  };

  const handleReplaceContent = (newContent: string) => {
    setMarkdown(newContent);
  };

  const toggleDark = () => setIsDark((prev) => !prev);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = editorWidth;
    const containerWidth = containerRef.current?.offsetWidth || 1;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = ((e.clientX - startX) / containerWidth) * 100;
      const newWidth = Math.min(80, Math.max(20, startWidth + delta));
      setEditorWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const insertAnchor = () => {
    const anchorName = window.prompt('Enter anchor ID (e.g., section-name):', 'section-name');
    if (!anchorName) return;
    insertAtCursor(`\n<a id="${anchorName}"></a>\n`);
  };

  const handleOpenTranslateModal = () => {
    const textarea = editorRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      setTranslateSelectedText(markdown.substring(start, end));
    } else {
      setTranslateSelectedText('');
    }
    setIsTranslateModalOpen(true);
  };

  const handleApplyTranslation = (translated: string, mode: 'full' | 'selection') => {
    if (mode === 'full') {
      setMarkdown(translated);
    } else {
      const textarea = editorRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = markdown.substring(0, start) + translated + markdown.substring(end);
        setMarkdown(newValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = start;
          textarea.selectionEnd = start + translated.length;
          textarea.focus();
        });
      }
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toolbar
        markdown={markdown}
        setMarkdown={setMarkdown}
        onInsert={insertAtCursor}
        onWrap={wrapSelection}
        onAlign={applyAlignment}
        onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
        onOpenTableModal={() => setIsTableModalOpen(true)}
        onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        onOpenTranslateModal={handleOpenTranslateModal}
        onOpenSectionModal={() => setIsSectionModalOpen(true)}
        onOpenStyleModal={() => setIsStyleModalOpen(true)}
        onInsertAnchor={insertAnchor}
        onOpenQualityModal={() => setIsQualityModalOpen(true)}
        onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
        isDark={isDark}
        onToggleDark={toggleDark}
      />
      <div className="flex flex-1 overflow-hidden p-4 gap-4" ref={containerRef}>
        <div
          style={{ width: `${editorWidth}%` }}
          className="glass rounded-2xl overflow-hidden transition-all duration-200"
        >
          <Editor ref={editorRef} markdown={markdown} setMarkdown={setMarkdown} />
        </div>
        <div
          className="w-1.5 cursor-col-resize bg-gray-300/50 dark:bg-gray-600/50 rounded-full hover:bg-indigo-400 transition"
          onMouseDown={handleMouseDown}
        />
        <div
          style={{ width: `${100 - editorWidth}%` }}
          className="glass rounded-2xl overflow-hidden transition-all duration-200"
        >
          <Preview markdown={markdown} />
        </div>
      </div>

      {isBadgeModalOpen && (
        <BadgeModal onClose={() => setIsBadgeModalOpen(false)} onAddBadge={handleAddBadge} />
      )}
      {isTableModalOpen && (
        <TableModal onClose={() => setIsTableModalOpen(false)} onAddTable={handleAddTable} />
      )}
      {isTemplateModalOpen && (
        <TemplateModal onClose={() => setIsTemplateModalOpen(false)} onSelectTemplate={handleReplaceContent} />
      )}
      {isTranslateModalOpen && (
        <TranslateModal
          onClose={() => setIsTranslateModalOpen(false)}
          markdown={markdown}
          selectedText={translateSelectedText}
          onApplyTranslation={handleApplyTranslation}
        />
      )}
      {isSectionModalOpen && (
        <SectionModal
          onClose={() => setIsSectionModalOpen(false)}
          onInsert={insertAtCursor}
        />
      )}
      {isStyleModalOpen && (
        <StyleModal
          onClose={() => setIsStyleModalOpen(false)}
          onApplyStyle={applyStyle}
        />
      )}
      {isQualityModalOpen && (
        <QualityModal
          markdown={markdown}
          onClose={() => setIsQualityModalOpen(false)}
        />
      )}
      {isGenerateModalOpen && (
        <GenerateModal
          onClose={() => setIsGenerateModalOpen(false)}
          onGenerate={handleReplaceContent}
        />
      )}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;