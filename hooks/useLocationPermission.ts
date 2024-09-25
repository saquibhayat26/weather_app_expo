import { useCallback } from "react";
import { Alert, Linking } from "react-native";
import * as Location from "expo-location";

export const useLocationPermission = () => {
  const requestLocationPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === Location.PermissionStatus.GRANTED) {
      console.log("You can use the location");
      return true;
    } else {
      console.log("You cannot use the location");
      Alert.alert(
        "Permission Required",
        "Location access is required for fetching the location data. Please enable it in the app settings.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Go to Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }
  }, []);

  return { requestLocationPermission };
};
