import { HabitDay } from "./HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimunSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length;

export const SummaryTable = () => {
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
        {summaryDates.map((date) => (
          <HabitDay key={date.toString()} type="missed" />
        ))}

        {minimunSummaryDatesSize > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <HabitDay key={index} type="empty" />
          ))}
      </div>
    </div>
  );
};
