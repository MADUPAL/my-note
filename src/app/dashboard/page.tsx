import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/server/db";
import { UserButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Dashboard = async (props: Props) => {
  const { userId } = await auth();
  const notes = await db.note.findMany({
    where: {
      userId: userId!,
    },
  });
  return (
    <>
      <div className="grainy min-h-screen">
        <div className="mx-auto max-w-7xl p-10">
          <div className="h-14"></div>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center">
              <Link href="/">
                <Button className="bg-green-600" size="sm">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <div className="text-3xl font-bold text-gray-900">My Notes</div>
              <div className="w-4"></div>
              <UserButton />
            </div>
          </div>
          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          {/* list all the notes */}
          {/* TODO conditionally rendered */}
          {notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no Notes yet</h2>
            </div>
          )}

          {/* display all notes */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
            <CreateNoteDialog />

            {notes.map((note) => {
              return (
                <a href={`/notes/${note.id}`} key={note.id}>
                  <div className="flex flex-col overflow-hidden rounded-lg border border-stone-200 transition hover:-translate-y-1 hover:shadow-xl">
                    <img
                      width={400}
                      height={200}
                      alt={note.name}
                      src="public/1772-pepe-present.png"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {note.name}
                      </h3>
                      <div className="h-1">
                        <p className="text-sm text-gray-500">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
