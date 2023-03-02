import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import colors from "tailwindcss/colors";

const availableDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const New = () => {
  const [checked, setChecked] = useState<number[]>([]);

  const handleToggleWeekDay = (index: number) => {
    if (checked.includes(index)) {
      setChecked(checked.filter((item) => item !== index));
    } else {
      setChecked([...checked, index]);
    }
  };

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="text-3xl font-extrabold text-white mt-6">New</Text>

        <Text className="text-white mt-6 font-semibold text-base">
          What is the name of your habit?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Habit name"
          placeholderTextColor={colors.gray[400]}
        />

        <Text className="text-white mt-4 mb-3 font-semibold text-base">
          What days do you want to do?
        </Text>

        {availableDays.map((day, index) => (
          <CheckBox
            key={day}
            title={day}
            onPress={() => handleToggleWeekDay(index)}
            checked={checked.includes(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-center mt-8 bg-green-600 h-12 rounded-lg"
        >
          <Feather name="check" color={colors.white} size={20} />

          <Text className="text-white text-base ml-3 font-semibold">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
