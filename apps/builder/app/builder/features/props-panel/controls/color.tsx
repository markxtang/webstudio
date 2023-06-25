import { useId } from "@webstudio-is/design-system";
import {
  type ControlProps,
  getLabel,
  useLocalValue,
  HorizontalLayout,
} from "../shared";
import { parseColor } from "@webstudio-is/css-data";
import { PropertiesColorPicker } from "../../style-panel/shared/color-picker/properties-color-picker";

// @todo:
//   use ColorPicker (need to refactor it first,
//   as it's currently tailored to work with styles only)

export const ColorControl = ({
  meta,
  prop,
  propName,
  onChange,
  onDelete,
}: ControlProps<"color", "string">) => {
  const id = useId();

  const localValue = useLocalValue(prop?.value ?? "", (value) =>
    onChange({ type: "string", value })
  );

  const currentColor = parseColor({
    type: "unparsed",
    value: localValue.value,
  });

  return (
    <HorizontalLayout
      label={getLabel(meta, propName)}
      id={id}
      onDelete={onDelete}
    >
      <PropertiesColorPicker
        property="color"
        currentColor={currentColor}
        value={currentColor}
        onChange={(styleValue) => {
          console.log(styleValue);
        }}
        onChangeComplete={() => {}}
        onAbort={() => {}}
      />
    </HorizontalLayout>
  );
};
