import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckBoxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export const CheckBox = ({
  title,
  checked = false,
  ...rest
}: CheckBoxProps) => {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      className="mb-2 flex-row items-center"
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" color={colors.white} size={20} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      )}
      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};
