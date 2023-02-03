import { View, Text, ScrollView } from "react-native";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

import { DAY_SIZE, HabitDay } from "../components/Habit";
import { Header } from "../components/Header";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
            key={`${weekDay}-${index}`}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDay key={date.toISOString()} type="missed" />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <HabitDay key={index} type="empty" />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
