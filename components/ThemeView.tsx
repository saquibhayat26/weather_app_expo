import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

interface ThemeViewProps {
  children: React.ReactNode;
  style?: {};
  isLoading: boolean;
}

const ThemeView = ({ children, style, isLoading }: ThemeViewProps) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/nature-phone.jpg")}
        style={[styles.container, { ...style }]}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          {isLoading ? (
            <ActivityIndicator size="large" color="#bbbbc4" />
          ) : (
            children
          )}
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ThemeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
