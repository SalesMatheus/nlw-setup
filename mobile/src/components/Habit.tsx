import {
  Dimensions,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  type: "completed" | "missed" | "empty";
}

export const HabitDay = ({ type, ...rest }: HabitDayProps) => {
  if (type === "empty") {
    return (
      <View
        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40 "
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
      />
    );
  }
  if (type === "completed") {
    return (
      <TouchableOpacity
        {...rest}
        className=" bg-violet-500 rounded-lg border-2 m-1 border-zinc-800"
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
        activeOpacity={0.8}
      />
    );
  }

  return (
    <TouchableOpacity
      {...rest}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.8}
    />
  );
};
