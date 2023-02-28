import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface HabitProps {
  date: string;
}

export const Habit = () => {
  const route = useRoute();
  const { date } = route.params as HabitProps;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");
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

        <ProgressBar progress={50} />

        <View className="mt-6">
          <CheckBox title="Drink 2L of water" />
          <CheckBox title="Do 30 minutes of exercise" checked />
          <CheckBox title="Read 30 minutes" checked />
          <CheckBox title="Meditate 10 minutes" />
        </View>
      </ScrollView>
    </View>
  );
};
