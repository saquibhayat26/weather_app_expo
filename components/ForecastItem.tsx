import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";

const ForecastItem = ({
  data,
}: {
  data: { min: string; max: string; feelsLike: string; date: string };
}) => {
  return (
    <BlurView intensity={80} style={styles.container}>
      <View>
        <Text style={styles.date}>{data.date}</Text>
        <Text style={styles.temp}>Min: {data.min}</Text>
        <Text style={styles.temp}>Max: {data.max}</Text>
        <Text style={styles.temp}>Feels Like: {data.feelsLike}</Text>
      </View>
    </BlurView>
  );
};

export default ForecastItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    overflow: "hidden",
    width: "auto",
    height: "auto",
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "gainsboro",
  },

  temp: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "SpaceMono",
    textAlign: "left",
  },

  date: {
    fontSize: 12,
    color: "#fff",
    textAlign: "left",
    fontFamily: "SpaceMono",
  },
});
