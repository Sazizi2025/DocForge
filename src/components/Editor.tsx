import { forwardRef } from 'react';

interface EditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ markdown, setMarkdown }, ref) => {
    const isRTL = /[\u0600-\u06FF\u0750-\u077F]/.test(markdown);

    return (
      <textarea
        ref={ref}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="w-full h-full p-6 font-mono text-sm bg-transparent dark:bg-transparent dark:text-gray-100 text-gray-800 resize-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Type your Markdown here..."
        spellCheck={false}
      />
    );
  }
);

export default Editor;