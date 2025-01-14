"use client";
import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton, useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  // const { user } = useUser();

  // <div>{user?.firstName}</div>
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
          <div className="text-center">
            <h2 className="text-xl text-gray-500">You have no Notes yet</h2>
          </div>
          {/* display all notes */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
            <CreateNoteDialog />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
