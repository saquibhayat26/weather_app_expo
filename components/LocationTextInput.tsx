import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import * as Location from "expo-location";

interface LocationInputProps extends TextInputProps {
  onLocationSet: (location: { lat: number; lon: number }) => void;
}

const LocationTextInput = ({ onLocationSet, ...props }: LocationInputProps) => {
  const handleEndEditing = async (text: string) => {
    try {
      const res = await Location.geocodeAsync(text);
      if (res.length > 0) {
        onLocationSet({
          lat: res[0].latitude,
          lon: res[0].longitude,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <TextInput
      style={styles.textInput}
      placeholder="Please enter a location"
      cursorColor={"ghostwhite"}
      placeholderTextColor={"ghostwhite"}
      onChange={(e) => handleEndEditing(e.nativeEvent.text)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: "ghostwhite",
  },
});

export default LocationTextInput;
