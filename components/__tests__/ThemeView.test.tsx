import React from "react";
import { render } from "@testing-library/react-native";
import ThemeView from "../ThemeView";
import { Text } from "react-native";

describe("ThemeView Component", () => {
  it("should render children when isLoading is false", () => {
    const { getByText } = render(
      <ThemeView isLoading={false}>
        <Text>Test Content</Text>
      </ThemeView>
    );
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should render ActivityIndicator when isLoading is true", () => {
    const { getByTestId } = render(
      <ThemeView isLoading={true}>
        <Text>Test Content</Text>
      </ThemeView>
    );
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });
});
