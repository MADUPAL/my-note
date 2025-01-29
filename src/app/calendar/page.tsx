"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const CalendarPage = (props: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  console.log(date);
  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};

export default CalendarPage;
