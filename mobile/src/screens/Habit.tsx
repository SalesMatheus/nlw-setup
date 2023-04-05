import { ScrollView, View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import clsx from "clsx";

import { api } from "../lib/axios";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

interface HabitProps {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export const Habit = () => {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as HabitProps;

  const parsedDate = dayjs(date);

  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.locale("en").format("dddd");
  const dayAndMonth = parsedDate.locale("en").format("MM/DD");

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length
      )
    : 0;

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await api.get("/day", { params: { date } });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits(
          completedHabits.filter((habit) => habit !== habitId)
        );
      } else {
        setCompletedHabits([...completedHabits, habitId]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extra-bold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx("mt-6", {
            ["opacity-50"]: isDateInPast,
          })}
        >
          {dayInfo?.possibleHabits.length ? (
            dayInfo?.possibleHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            You can't edit habits from the past
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
