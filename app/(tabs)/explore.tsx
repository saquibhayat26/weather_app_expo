import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen = () => {
  return (
    <LinearGradient colors={["#00c6ff", "#0072ff"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Ionicons name="sunny" size={50} color="#fff" />
          <Text style={styles.sectionTitle}>Real-Time Weather</Text>
          <Text style={styles.sectionContent}>
            Stay updated with live weather forecasts from around the world. Get
            precise weather updates for your location or any place of interest.
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="cloudy-night" size={50} color="#fff" />
          <Text style={styles.sectionTitle}>Accurate Forecasts</Text>
          <Text style={styles.sectionContent}>
            {/* every three hours forecast for next 18 hours */}
            Get accurate weather forecasts for the next 18 hours, every three
            hours.
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="water" size={50} color="#fff" />
          <Text style={styles.sectionTitle}>User-Friendly Design</Text>
          <Text style={styles.sectionContent}>
            A clean and intuitive design that’s easy to navigate, making weather
            tracking a breeze.
          </Text>
        </View>

        <View style={styles.section}>
          <Ionicons name="globe" size={50} color="#fff" />
          <Text style={styles.sectionTitle}>Global Coverage</Text>
          <Text style={styles.sectionContent}>
            Check the weather anywhere around the globe with ease. No matter
            where you are, the weather is at your fingertips.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Discover more features and enjoy the experience with our app.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
  },
});
