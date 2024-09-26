import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/context/ThemeContext";
import { LocationProvider } from "@/context/LocationContext";
import { StyleSheet, Animated, View } from "react-native";
import React from "react";

const TabIcon = ({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
}) => {
  const scale = focused ? 1.2 : 1;
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Ionicons
        name={name}
        size={28}
        style={{ marginBottom: -3 }}
        color={color}
      />
    </Animated.View>
  );
};

export default function TabLayout() {
  return (
    <ThemeContext.Provider value="light">
      <LocationProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarLabelStyle: styles.tabLabelStyle,
            tabBarStyle: styles.tabBarStyle,
            tabBarInactiveTintColor: "#aca9a9",
            tabBarActiveTintColor: "#fff",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </LocationProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#000",
    paddingVertical: 10,
    height: 60,
  },
  tabLabelStyle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
});
