import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

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
  const [habitName, setHabitName] = useState("");
  const handleToggleWeekDay = (index: number) => {
    if (checked.includes(index)) {
      setChecked(checked.filter((item) => item !== index));
    } else {
      setChecked([...checked, index]);
    }
  };

  const handleCreateNewHabit = async () => {
    try {
      if (!habitName.trim() || checked.length === 0) {
        Alert.alert(
          "Please, inform the habit name and select at least one day"
        );
        return;
      }

      await api.post("/habits", {
        title: habitName,
        weekDays: checked,
      });

      setHabitName("");
      setChecked([]);

      Alert.alert("Success", "Habit created successfully");
    } catch (error) {
      console.warn(error);
      Alert.alert("Error", "Something went wrong");
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
          onChangeText={setHabitName}
          value={habitName}
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
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" color={colors.white} size={20} />

          <Text className="text-white text-base ml-3 font-semibold">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
