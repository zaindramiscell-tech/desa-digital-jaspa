
"use client";

import React, { useEffect, useRef, memo } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';

interface EditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
  holder: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, holder }) => {
  const ref = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        data: data,
        async onChange(api) {
          const savedData = await api.saver.save();
          onChange(savedData);
        },
        placeholder: "Mulai tulis isi berita di sini...",
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={holder} className="w-full min-h-[400px] bg-background border rounded-md px-2 py-1" />;
};

export default memo(Editor);
