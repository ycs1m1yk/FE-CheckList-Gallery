import React, { forwardRef } from 'react';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface ViewerProps{
  text:string,
}

export const MarkdownEditor = forwardRef((props, ref) => (
  <Editor ref={ref} />
));

export function MarkdownViewer({ text }:ViewerProps) {
  return (
    <Viewer initialValue={text} />
  );
}
