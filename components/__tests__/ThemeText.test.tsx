import React from "react";
import { render } from "@testing-library/react-native";
import ThemeText from "../ThemeText";

describe("ThemeText Component", () => {
  it("renders the children correctly", () => {
    const { getByText } = render(<ThemeText>Sample Text</ThemeText>);
    expect(getByText("Sample Text")).toBeTruthy();
  });
});
