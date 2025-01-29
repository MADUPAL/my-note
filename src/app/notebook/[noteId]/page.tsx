import DeleteButton from "@/components/DeleteButton";
import TipTapEditor from "@/components/TipTapEditor";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    noteId: String;
  };
};

const NotebookPage = async ({ params }: Props) => {
  const { noteId } = await params;
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  const note = await db.note.findUnique({
    where: {
      id: Number(noteId),
      userId: userId,
    },
  });
  if (!note) {
    return redirect("/dashboard");
  }

  return (
    <div className="grainy min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center rounded-lg border border-stone-200 p-4 shadow-xl">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="mx-1 inline-block">/</span>
          <span className="font-semibold text-stone-500">{note.name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </div>

        <div className="h-4"></div>
        <div className="w-full rounded-lg border border-stone-200 px-16 py-8 shadow-xl">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;
