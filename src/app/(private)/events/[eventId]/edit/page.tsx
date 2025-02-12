import { EventForm } from "@/components/forms/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";

export const revalidate = 0;

const EditEventPage = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) {
    return redirectToSignIn();
  }
  const event = await db.event.findUnique({
    where: {
      id: eventId,
      userId: userId,
    },
  });
  if (event == null) {
    return notFound();
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={{ ...event, description: event?.description || undefined }}
        />
      </CardContent>
    </Card>
  );
};

export default EditEventPage;
