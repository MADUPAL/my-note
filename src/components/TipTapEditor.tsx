"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import TIpTapMenuBar from "./TipTapMenuBar";
type Props = {};

const TipTapEditor = (props: Props) => {
  const [editorState, setEditorState] = React.useState("");
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  return (
    <>
      <div className="flex">
        {editor && <TIpTapMenuBar editor={editor} />}
        <Button>Saved</Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTapEditor;
