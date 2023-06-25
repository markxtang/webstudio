import { Flex } from "@webstudio-is/design-system";
import type { ControlProps } from "../../style-sections";
import { type CssColorPickerValueInput } from "../../shared/color-picker";
import { StyleColorPicker } from "../../shared/color-picker/style-color-picker";
import { getStyleSource } from "../../shared/style-info";
import { styleConfigByName } from "../../shared/configs";
import { useState } from "react";
import { parseColor } from "@webstudio-is/css-data";

export const ColorControl = ({
  property,
  items,
  currentStyle,
  setProperty,
  deleteProperty,
}: ControlProps) => {
  const [intermediateValue, setIntermediateValue] =
    useState<CssColorPickerValueInput>();

  const { items: defaultItems } = styleConfigByName(property);
  const styleInfo = currentStyle[property];

  let value = currentStyle[property]?.value ?? {
    type: "keyword" as const,
    value: "black",
  };

  const setValue = setProperty(property);

  if (value.type !== "rgb" && value.type !== "keyword") {
    // Support previously set colors
    value = parseColor(value);
  }

  const currentColor = parseColor(currentStyle["color"]?.currentColor);

  return (
    <Flex align="center" gap="1">
      <StyleColorPicker
        currentColor={currentColor}
        property={property}
        value={value}
        styleSource={getStyleSource(styleInfo)}
        keywords={(items ?? defaultItems).map((item) => ({
          type: "keyword",
          value: item.name,
        }))}
        intermediateValue={intermediateValue}
        onChange={(styleValue) => {
          setIntermediateValue(styleValue);

          if (styleValue === undefined) {
            deleteProperty(property, { isEphemeral: true });
            return;
          }

          if (styleValue.type !== "intermediate") {
            setValue(styleValue, { isEphemeral: true });
          }
        }}
        onHighlight={(styleValue) => {
          if (styleValue !== undefined) {
            setValue(styleValue, { isEphemeral: true });
          } else {
            deleteProperty(property, { isEphemeral: true });
          }
        }}
        onChangeComplete={({ value }) => {
          setValue(value);
          setIntermediateValue(undefined);
        }}
        onAbort={() => {
          deleteProperty(property, { isEphemeral: true });
        }}
      />
    </Flex>
  );
};
