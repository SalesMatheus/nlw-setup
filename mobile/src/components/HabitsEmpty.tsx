import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const HabitsEmpty = () => {
  const { navigate } = useNavigation();
  return (
    <Text className="text-base text-zinc-400">
      You don't have any habits yet{"   "}
      <Text
        className="text-violet text-base underline active:text-violet-500"
        onPress={() => navigate("new")}
      >
        Add a habit
      </Text>
    </Text>
  );
};
