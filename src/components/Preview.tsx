import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';

interface PreviewProps {
  markdown: string;
}

export default function Preview({ markdown }: PreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [markdown]);

  const html = marked.parse(markdown);
  const isRTL = /[\u0600-\u06FF\u0750-\u077F]/.test(markdown);

  return (
    <div
      ref={contentRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full h-full p-6 prose dark:prose-invert max-w-none overflow-y-auto bg-transparent text-start"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}