import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { noteId, editorState } = body;
    if (!editorState || !noteId) {
      return new NextResponse("Missing editorState or noteId", { status: 400 });
    }
    noteId = parseInt(noteId);

    const note = await db.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      return new NextResponse("Fail to Update", { status: 500 });
    }
    if (note.editorState !== editorState) {
      await db.note.update({
        where: {
          id: noteId,
        },
        data: {
          editorState: editorState,
        },
      });
    }
    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
