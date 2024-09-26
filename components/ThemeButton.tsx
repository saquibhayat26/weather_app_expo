import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
interface ThemeButtonProps {
  title: string;
  onPress: () => void;
}

const ThemeButton = ({ title, onPress }: ThemeButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "ghostwhite",
    padding: 10,
  },
});
