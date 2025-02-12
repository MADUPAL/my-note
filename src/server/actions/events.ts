"use server";

import { eventFormSchema } from "@/schema/events";
import { auth } from "@clerk/nextjs/server";
import "use-server";
import { z } from "zod";
import { db } from "../db";
import { redirect } from "next/navigation";

export const createEvent = async (
  unsafeData: z.infer<typeof eventFormSchema>,
): Promise<{ error: boolean } | undefined> => {
  const { userId } = await auth();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true };
  }

  await db.event.create({
    data: {
      ...data,
      userId: userId,
    },
  });

  redirect("/events");
};

export const updateEvent = async (
  id: string,
  unsafeData: z.infer<typeof eventFormSchema>,
): Promise<{ error: boolean } | undefined> => {
  const { userId } = await auth();
  const { success, data } = eventFormSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true };
  }
  const result = await db.event.update({
    where: {
      id: id,
      userId: userId,
    },
    data: {
      ...data,
    },
  });
  if (result == null) {
    return { error: true };
  }
  redirect("/events");
};

export const deleteEvent = async (
  id: string,
): Promise<{ error: boolean } | undefined> => {
  const { userId } = await auth();

  if (userId == null) {
    return { error: true };
  }
  const result = await db.event.delete({
    where: {
      id: id,
      userId: userId,
    },
  });
  if (result == null) {
    return { error: true };
  }
  redirect("/events");
};
