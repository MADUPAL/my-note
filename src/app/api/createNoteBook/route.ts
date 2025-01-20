// /api/createNoteBook

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const body = await req.json();
  const { name } = body;
  /* TODO */

  const note = await db.note.create({
    data: {
      name: name,
      userId: userId,
    },
  });
  return NextResponse.json({
    noteId: note.id,
  });
}
