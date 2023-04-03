import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";

import { ProgressBar } from "./ProgressBar";
import { HabitsList } from "./HabitsList";

interface HabitDayProps {
  type: "progress" | "empty";
  defaultCompleted?: number;
  amount?: number;
  date: Date;
}

export function HabitDay({
  type,
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MMM");
  const dayOfWeek = dayjs(date).format("dddd");

  if (type === "empty") {
    return (
      <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
    );
  }

  const handleCompletedChange = (newCompleted: number) => {
    setCompleted(newCompleted);
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-900 border-zinc-800": completedPercentage === 0,
            "bg-violet-900 border-violet-700":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-violet-800 border-violet-600":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className=" font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className=" mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChange} />

          <Popover.Arrow className="fill-zinc-900 h-2 w-4" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
