import { useEffect, useState } from "react";
import { HabitDay } from "./HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimunSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length;

type Symmary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export const SummaryTable = () => {
  const [summary, setSummary] = useState<Symmary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${index}-${weekDay}`}
            className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });
            return (
              <HabitDay
                key={date.toString()}
                type="progress"
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}

        {minimunSummaryDatesSize > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <HabitDay
              key={index}
              type="empty"
              defaultCompleted={0}
              amount={0}
              date={new Date()}
            />
          ))}
      </div>
    </div>
  );
};
