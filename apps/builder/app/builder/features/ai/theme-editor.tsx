import type {
  FontFamilyValue,
  RgbValue,
  Theme,
  UnitValue,
} from "@webstudio-is/css-data";
import { Box, Flex, Text, theme } from "@webstudio-is/design-system";
import { useState } from "react";
import type { Entries } from "type-fest";
import {
  ColorPickerUI,
  type CssColorPickerValueInput,
} from "../style-panel/shared/color-picker";

export const ThemeEditor = function ThemeEditor({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange?: (theme: Theme) => void;
}) {
  return (
    <Flex direction="column" gap={6}>
      <Flex gap={2} direction="column">
        <Text>Background Colors</Text>
        <Flex gap={4} wrap="wrap">
          {(
            Object.entries(theme.backgroundColor) as Entries<
              typeof theme.backgroundColor
            >
          ).map(([label, value], index) => (
            <Color
              label={label}
              value={value}
              key={index}
              onChange={
                typeof onChange === "function"
                  ? (value) => {
                      theme.backgroundColor[label] = value;
                      onChange(theme);
                    }
                  : undefined
              }
            />
          ))}
        </Flex>
      </Flex>

      <Flex gap={2} direction="column">
        <Text>Text Colors</Text>
        <Flex gap={4} wrap="wrap">
          {(Object.entries(theme.color) as Entries<typeof theme.color>).map(
            ([label, value], index) => (
              <Color
                label={label}
                value={value}
                key={index}
                onChange={
                  typeof onChange === "function"
                    ? (value) => {
                        theme.color[label] = value;
                        onChange(theme);
                      }
                    : undefined
                }
              />
            )
          )}
        </Flex>
      </Flex>

      <Flex gap={2} direction="column">
        <Text>Border Colors</Text>
        <Flex gap={4} wrap="wrap">
          {(Object.entries(theme.border) as Entries<typeof theme.border>).map(
            ([label, value], index) => (
              <BorderColor
                label={label}
                value={value}
                key={index}
                onChange={
                  typeof onChange === "function"
                    ? (value) => {
                        theme.border[label] = value;
                        onChange(theme);
                      }
                    : undefined
                }
              />
            )
          )}
        </Flex>
      </Flex>

      <Flex gap={2} direction="column">
        <Text>Box Shadows</Text>
        <Flex gap={4} wrap="wrap">
          {(
            Object.entries(theme.boxShadowColor) as Entries<
              typeof theme.boxShadowColor
            >
          ).map(([label, value], index) => (
            <BoxShadow
              label={label}
              value={value}
              key={index}
              onChange={
                typeof onChange === "function"
                  ? (value) => {
                      theme.boxShadowColor[label] = value;
                      onChange(theme);
                    }
                  : undefined
              }
            />
          ))}
        </Flex>
      </Flex>

      <Flex gap={2} direction="column">
        <Text>Gradients</Text>
        <Flex gap={4} wrap="wrap">
          {Object.values(theme.gradientColorStops).map((values, index) => (
            <Gradient value={values} key={index} />
          ))}
        </Flex>
      </Flex>

      <Flex gap={2} direction="column">
        <Text>Fonts</Text>
        <Flex gap={2} direction="column">
          {(
            Object.entries(theme.fontFamily) as Entries<typeof theme.fontFamily>
          ).map(([label, value], index) => (
            <Font label={label} value={value} key={index} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export const ColorPreview = ({ color }: { color: RgbValue }) => (
  <Box
    css={{
      width: 24,
      height: 24,
      borderRadius: theme.borderRadius[2],
      backgroundColor: toRgba(color),
    }}
  />
);

const toRgba = (color: RgbValue): string =>
  `rgba(${color.r},${color.g},${color.b},${color.alpha})`;

const Color = function Color({
  label,
  value,
  onChange,
}: {
  label: string;
  value: RgbValue;
  onChange?: (value: RgbValue) => void;
}) {
  const [intermediateValue, setIntermediateValue] =
    useState<CssColorPickerValueInput>();

  const trigger = (
    <Box
      css={{
        width: 48,
        height: 48,
        marginBottom: theme.spacing[1],
        borderRadius: theme.borderRadius[4],
        backgroundColor: toRgba(
          intermediateValue && intermediateValue.type === "rgb"
            ? intermediateValue
            : value
        ),
      }}
    />
  );

  return (
    <Box>
      <ColorPickerUI
        trigger={trigger}
        currentColor={value}
        value={value}
        intermediateValue={intermediateValue}
        onChange={setIntermediateValue}
        onChangeComplete={({ value }) => {
          if (value.type === "rgb" && typeof onChange === "function") {
            onChange(value);
          }
        }}
      />
      <Text>{label}</Text>
    </Box>
  );
};

const BorderColor = function BorderColor({
  label,
  value,
}: {
  label: string;
  value: RgbValue;
}) {
  return (
    <Box>
      <Box
        css={{
          width: 50,
          height: 50,
          marginBottom: theme.spacing[1],
          borderRadius: theme.borderRadius[4],
          border: `2px solid ${toRgba(value)}`,
        }}
      />
      <Box css={{ textAlign: "center" }}>
        <Text>{label}</Text>
      </Box>
    </Box>
  );
};

const BorderRadius = function BorderRadius({
  label,
  value,
}: {
  label: string;
  value: UnitValue;
}) {
  return (
    <Box>
      <Box
        css={{
          width: 50,
          height: 50,
          marginBottom: theme.spacing[1],
          borderRadius: `${value.value}${value.unit}`,
          border: `2px solid #666`,
        }}
      />
      <Box css={{ textAlign: "center" }}>
        <Text>{label}</Text>
      </Box>
    </Box>
  );
};

const BoxShadow = function BoxShadow({
  label,
  value,
}: {
  label: string;
  value: RgbValue;
}) {
  return (
    <Box>
      <Box
        css={{
          width: 50,
          height: 50,
          marginBottom: theme.spacing[1],
          borderRadius: theme.borderRadius[4],
          boxShadow: `0 2px 6px ${toRgba(value)}`,
        }}
      />
      <Box css={{ textAlign: "center" }}>
        <Text>{label}</Text>
      </Box>
    </Box>
  );
};

const Gradient = function Gradient({ value }: { value: [RgbValue, RgbValue] }) {
  return (
    <Box>
      <Box
        css={{
          width: 50,
          height: 50,
          marginBottom: theme.spacing[1],
          borderRadius: theme.borderRadius[4],
          backgroundImage: `linear-gradient(45deg, ${toRgba(
            value[0]
          )}, ${toRgba(value[1])})`,
        }}
      />
    </Box>
  );
};

const Font = function Font({
  label,
  value,
}: {
  label: string;
  value: FontFamilyValue;
}) {
  return (
    <Box>
      <Text>
        {label}: {value.value.join(",")}
      </Text>
      <Text css={{ fontFamily: value.value.join(",") }}>
        <span
          contentEditable
          dangerouslySetInnerHTML={{ __html: `Lorem Ipsum` }}
        />
      </Text>
    </Box>
  );
};

const FontSize = function FontSize({
  label,
  value,
  family,
}: {
  label: string;
  value: [UnitValue, { lineHeight: UnitValue }];
  family: FontFamilyValue;
}) {
  const fontSize = `${value[0].value}${value[0].unit}`;
  const lineHeightUnit = value[1].lineHeight.unit;
  const lineHeight = `${value[1].lineHeight.value}${
    lineHeightUnit === "number" ? "" : lineHeightUnit
  }`;

  return (
    <Text
      css={{
        display: "block",
        fontSize,
        lineHeight,
        fontFamily: family.value.join(","),
        whiteSpace: "nowrap",
        overflow: "auto visible",
      }}
    >
      {label} - {fontSize} / {lineHeight}
    </Text>
  );
};
