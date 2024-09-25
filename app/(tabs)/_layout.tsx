import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { useLocationPermission } from "@/hooks/useLocationPermission";
import { ThemeContext } from "@/context/ThemeContext";
import { LocationContext } from "@/context/LocationContext";

const TabIcon = ({
  name,
  color,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) => {
  return (
    <Ionicons
      name={name}
      size={28}
      style={{ marginBottom: -3 }}
      color={color}
    />
  );
};

export default function TabLayout() {
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const { requestLocationPermission } = useLocationPermission();

  // useEffect(() => {
  //   (async () => {
  //     const granted = await requestLocationPermission();
  //     if (!granted) {
  //       console.log("Location permission denied");
  //       setErrorMsg("Permission to access location was denied" as any);
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location as any);
  //   })();
  // }, []);

  return (
    <ThemeContext.Provider value="light">
      {/* <LocationContext.Provider value={{ location, errorMsg }}> */}
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name={focused ? "home" : "home-outline"} color={color} />
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
              />
            ),
          }}
        />
      </Tabs>
      {/* </LocationContext.Provider> */}
    </ThemeContext.Provider>
  );
}
