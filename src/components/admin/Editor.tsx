
"use client";

import React, { useEffect, useRef, memo } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Paragraph from 'editorjs-paragraph-with-alignment';


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
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            config: {
              actions: ['bold', 'italic', 'inlineCode', 'link', 'strikethrough', 'superscript', 'subscript'],
              defaultAlignment: 'left'
            }
          },
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
                placeholder: 'Masukkan Judul',
                levels: [2, 3, 4],
                defaultLevel: 2
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
          }
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

  return <div id={holder} className="w-full min-h-[400px] bg-background border rounded-md px-3 py-2" />;
};

export default memo(Editor);
