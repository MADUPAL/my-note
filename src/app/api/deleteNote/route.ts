import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { noteId } = await req.json();
  await db.note.delete({
    where: {
      id: parseInt(noteId),
    },
  });
  return new NextResponse("ok", { status: 200 });
}
