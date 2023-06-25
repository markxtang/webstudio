import type { RgbValue, StyleValue } from "..";
import { colord } from "colord";
import { toValue } from "@webstudio-is/css-engine";

export const parseColor = (color?: StyleValue): RgbValue => {
  const colordValue = colord(toValue(color));

  if (colordValue.isValid()) {
    const rgb = colordValue.toRgb();
    return {
      type: "rgb",
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      alpha: rgb.a ?? 1,
    };
  }

  // @todo what to show as default?
  // Default to black
  return {
    type: "rgb",
    r: 0,
    g: 0,
    b: 0,
    alpha: 1,
  };
};
