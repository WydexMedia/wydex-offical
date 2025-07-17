'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TestTiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello Tiptap!</p>',
    immediatelyRender: false,
  });

  return (
    <div style={{ padding: 40 }}>
      <h1>Tiptap Test</h1>
      <EditorContent editor={editor} />
    </div>
  );
} 