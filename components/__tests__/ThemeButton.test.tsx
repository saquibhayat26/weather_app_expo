import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ThemeButton from "../ThemeButton";

describe("ThemeButton Component", () => {
  it("should render the button with the provided title", () => {
    const { getByText } = render(
      <ThemeButton title="Test Button" onPress={() => {}} />
    );
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("should call the onPress function when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ThemeButton title="Test Button" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
