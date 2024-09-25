import { StyleSheet, Text, View } from "react-native";

interface ThemeTextProps {
  children: React.ReactNode;
  style?: {};
}

const ThemeText = ({ children, style }: ThemeTextProps) => {
  return <Text style={[styles.text, { ...style }]}>{children}</Text>;
};

export default ThemeText;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
