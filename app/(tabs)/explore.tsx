import { StyleSheet, View, Text } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
    </View>
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
