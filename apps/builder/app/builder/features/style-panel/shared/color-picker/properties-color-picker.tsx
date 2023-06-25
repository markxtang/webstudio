import {
  Box,
  Combobox,
  InputField,
  theme,
  useCombobox,
} from "@webstudio-is/design-system";
import { ColorPicker } from ".";
import type { ColorPickerProps } from ".";
import type { CssValueInputValue } from "../css-value-input/css-value-input";
import { toPascalCase } from "../keyword-utils";
import { toValue } from "@webstudio-is/css-engine";

type PropertiesColorPickerProps = ColorPickerProps & {};

const itemToString = (item: CssValueInputValue | null) => {
  return item === null
    ? ""
    : item.type === "keyword"
    ? toPascalCase(toValue(item))
    : item.type === "intermediate" || item.type === "unit"
    ? String(item.value)
    : toValue(item);
};

export const PropertiesColorPicker = ({
  property,
  value,
  onChange,
  onChangeComplete,
  intermediateValue,
  currentColor,
}: PropertiesColorPickerProps) => {
  const { getInputProps, getComboboxProps } = useCombobox<CssValueInputValue>({
    items: [],
    value,
    selectedItem: value,
    itemToString,
    onInputChange: (inputValue) => {},
  });

  const inputProps = getInputProps();

  return (
    <Combobox>
      <Box css={{ width: theme.spacing[24] }} {...getComboboxProps()}>
        <InputField
          {...inputProps}
          prefix={
            <ColorPicker
              property={property}
              value={value}
              currentColor={currentColor}
              onChangeComplete={onChangeComplete}
              intermediateValue={intermediateValue}
              onChange={onChange}
            />
          }
        />
      </Box>
    </Combobox>
  );
};
