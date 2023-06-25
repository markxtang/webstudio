import type { KeywordValue, StyleValue } from "@webstudio-is/css-data";
import type { StyleSource } from "../style-info";
import { CssValueInput } from "../css-value-input";
import { ColorPicker, type ColorPickerProps } from ".";
import { toValue } from "@webstudio-is/css-engine";

type StyleColorPickerProps = ColorPickerProps & {
  onHighlight: (value: StyleValue | undefined) => void;
  onAbort: () => void;
  styleSource: StyleSource;
  keywords?: Array<KeywordValue>;
};

export const StyleColorPicker = ({
  property,
  onHighlight,
  onAbort,
  styleSource,
  keywords,
  value,
  intermediateValue,
  onChange,
  currentColor,
  onChangeComplete,
}: StyleColorPickerProps) => {
  return (
    <CssValueInput
      styleSource={styleSource}
      prefix={
        <ColorPicker
          property={property}
          value={value}
          onChange={onChange}
          onChangeComplete={onChangeComplete}
          intermediateValue={intermediateValue}
          currentColor={currentColor}
        />
      }
      showSuffix={false}
      property={property}
      value={value}
      intermediateValue={intermediateValue}
      keywords={keywords}
      onChange={(styleValue) => {
        if (
          styleValue?.type === "rgb" ||
          styleValue?.type === "keyword" ||
          styleValue?.type === "intermediate" ||
          styleValue?.type === "invalid" ||
          styleValue === undefined
        ) {
          onChange(styleValue);
          return;
        }

        onChange({
          type: "intermediate",
          value: toValue(styleValue),
        });
      }}
      onHighlight={onHighlight}
      onChangeComplete={({ value }) => {
        if (value.type === "rgb" || value.type === "keyword") {
          onChangeComplete({ value });
          return;
        }
        // In case value is parsed to something wrong
        onChange({
          type: "invalid",
          value: toValue(value),
        });
      }}
      onAbort={onAbort}
    />
  );
};
