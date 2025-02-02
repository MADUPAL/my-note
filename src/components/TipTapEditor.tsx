"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import TIpTapMenuBar from "./TipTapMenuBar";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/types";
type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(note.editorState || "");

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const debouncedEditorState = useDebounce(editorState, 1000);
  React.useEffect(() => {
    //save to db
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success update!", data);
      },
      onError: (error) => {
        console.error(error);
      },
    });
    console.log(debouncedEditorState);
  }, [debouncedEditorState]);
  return (
    <>
      <div className="flex">
        {editor && <TIpTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="prose">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default TipTapEditor;
