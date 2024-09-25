import ThemeText from "@/components/ThemeText";
import ThemeView from "@/components/ThemeView";
import { StyleSheet } from "react-native";

export default function ExploreScreen() {
  return (
    <ThemeView>
      <ThemeText>Explore Screen</ThemeText>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
