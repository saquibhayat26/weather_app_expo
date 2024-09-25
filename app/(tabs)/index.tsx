import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import { useLocationPermission } from "@/hooks/useLocationPermission";

export default function HomeScreen() {
  const { requestLocationPermission } = useLocationPermission();

  useEffect(() => {
    (async () => {
      const granted = await requestLocationPermission();
      console.log("🚀 ~ file: index.tsx:13 ~ granted:", granted);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Weather Home Screen</Text>
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
