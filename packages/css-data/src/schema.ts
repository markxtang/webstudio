import { z } from "zod";
import type { properties } from "./__generated__/properties";
import { units } from "./__generated__/units";

type Properties = typeof properties & {
  [custom: CustomProperty]: {
    appliesTo: "allElements";
    initial: string;
    inherited: boolean;
  };
};

export type StyleProperty = keyof Properties;

type CustomProperty = `--${string}`;

export type AppliesTo = Properties[StyleProperty]["appliesTo"];

export type UnitGroup = keyof typeof units;

type UnitEnum = (typeof units)[UnitGroup][number];

const Unit = z.union([
  // expected tuple with at least single element
  // so cast to tuple with single union element to get correct inference
  z.enum(Object.values(units).flat() as [UnitEnum]),
  z.literal("number"),
]);

export type Unit = z.infer<typeof Unit>;

export const UnitValue = z.object({
  type: z.literal("unit"),
  unit: Unit,
  value: z.number(),
});

export type UnitValue = z.infer<typeof UnitValue>;

export const KeywordValue = z.object({
  type: z.literal("keyword"),
  // @todo use exact type
  value: z.string(),
});
export type KeywordValue = z.infer<typeof KeywordValue>;

/**
 * Valid unparsed css value
 **/
export const UnparsedValue = z.object({
  type: z.literal("unparsed"),
  value: z.string(),
  // For the builder we want to be able to hide background-image
  hidden: z.boolean().optional(),
});

export type UnparsedValue = z.infer<typeof UnparsedValue>;

const FontFamilyValue = z.object({
  type: z.literal("fontFamily"),
  value: z.array(z.string()),
});
export type FontFamilyValue = z.infer<typeof FontFamilyValue>;

const RgbValue = z.object({
  type: z.literal("rgb"),
  r: z.number(),
  g: z.number(),
  b: z.number(),
  alpha: z.number(),
});
export type RgbValue = z.infer<typeof RgbValue>;

export const ImageValue = z.object({
  type: z.literal("image"),
  value: z.union([
    z.object({ type: z.literal("asset"), value: z.string() }),
    // url is not stored in db and only used by css-engine transformValue
    // to prepare image value for rendering
    z.object({ type: z.literal("url"), url: z.string() }),
  ]),
  // For the builder we want to be able to hide images
  hidden: z.boolean().optional(),
});

export type ImageValue = z.infer<typeof ImageValue>;

// We want to be able to render the invalid value
// and show it is invalid visually, without saving it to the db
export const InvalidValue = z.object({
  type: z.literal("invalid"),
  value: z.string(),
});
export type InvalidValue = z.infer<typeof InvalidValue>;

const UnsetValue = z.object({
  type: z.literal("unset"),
  value: z.literal(""),
});
export type UnsetValue = z.infer<typeof UnsetValue>;

export const TupleValueItem = z.union([
  UnitValue,
  KeywordValue,
  UnparsedValue,
  RgbValue,
]);
export type TupleValueItem = z.infer<typeof TupleValueItem>;

export const TupleValue = z.object({
  type: z.literal("tuple"),
  value: z.array(TupleValueItem),
  hidden: z.boolean().optional(),
});

export type TupleValue = z.infer<typeof TupleValue>;

const LayerValueItem = z.union([
  UnitValue,
  KeywordValue,
  UnparsedValue,
  ImageValue,
  TupleValue,
  InvalidValue,
]);

export type LayerValueItem = z.infer<typeof LayerValueItem>;
// To support background layers https://developer.mozilla.org/en-US/docs/Web/CSS/background
// and similar comma separated css properties
// InvalidValue used in case of asset not found
export const LayersValue = z.object({
  type: z.literal("layers"),
  value: z.array(LayerValueItem),
});

export type LayersValue = z.infer<typeof LayersValue>;

const ValidStaticStyleValue = z.union([
  ImageValue,
  LayersValue,
  UnitValue,
  KeywordValue,
  FontFamilyValue,
  RgbValue,
  UnparsedValue,
  TupleValue,
]);

export type ValidStaticStyleValue = z.infer<typeof ValidStaticStyleValue>;

/**
 * All StyleValue types that going to need wrapping into a CSS variable when rendered
 * on canvas inside builder.
 * Values like InvalidValue, UnsetValue, VarValue don't need to be wrapped
 */
export const isValidStaticStyleValue = (
  styleValue: StyleValue
): styleValue is ValidStaticStyleValue => {
  // guard against invalid checks
  const staticStyleValue = styleValue as ValidStaticStyleValue;
  return (
    staticStyleValue.type === "image" ||
    staticStyleValue.type === "layers" ||
    staticStyleValue.type === "unit" ||
    staticStyleValue.type === "keyword" ||
    staticStyleValue.type === "fontFamily" ||
    staticStyleValue.type === "rgb" ||
    staticStyleValue.type === "unparsed" ||
    staticStyleValue.type === "tuple"
  );
};

const VarValue = z.object({
  type: z.literal("var"),
  value: z.string(),
  fallbacks: z.array(ValidStaticStyleValue),
});
export type VarValue = z.infer<typeof VarValue>;

export const StyleValue = z.union([
  ValidStaticStyleValue,
  InvalidValue,
  UnsetValue,
  VarValue,
]);

export type StyleValue = z.infer<typeof StyleValue>;

const Style = z.record(z.string(), StyleValue);

export type Style = {
  [property in StyleProperty]?: StyleValue;
} & { [property: CustomProperty]: StyleValue };

// Themes

export const ColorMode = z.enum(["light", "dark"]);
export type ColorMode = z.infer<typeof ColorMode>;

const ThemeColorValue = z.object({
  base: RgbValue,
  elevate: RgbValue,
  primary: RgbValue,
  secondary: RgbValue,
  accent: RgbValue,
  muted: RgbValue,
  destructive: RgbValue,
});
const ThemeFontSizeValue = z.tuple([
  UnitValue,
  z.object({
    lineHeight: UnitValue,
  }),
]);

export const Theme = z.object({
  backgroundColor: ThemeColorValue,
  color: ThemeColorValue,
  border: ThemeColorValue,
  boxShadowColor: ThemeColorValue,
  gradientColorStops: z.tuple([
    z.tuple([RgbValue, RgbValue]),
    z.tuple([RgbValue, RgbValue]),
    z.tuple([RgbValue, RgbValue]),
  ]),
  fontFamily: z.object({
    base: FontFamilyValue,
    headings: FontFamilyValue,
  }),
  fontSize: z.object({
    xs: ThemeFontSizeValue,
    sm: ThemeFontSizeValue,
    base: ThemeFontSizeValue,
    lg: ThemeFontSizeValue,
    xl: ThemeFontSizeValue,
    "2xl": ThemeFontSizeValue,
    "3xl": ThemeFontSizeValue,
    "4xl": ThemeFontSizeValue,
    "5xl": ThemeFontSizeValue,
    "6xl": ThemeFontSizeValue,
    "7xl": ThemeFontSizeValue,
    "8xl": ThemeFontSizeValue,
    "9xl": ThemeFontSizeValue,
  }),
  borderRadius: z.object({
    none: UnitValue,
    full: UnitValue,
    sm: UnitValue,
    DEFAULT: UnitValue,
    md: UnitValue,
    lg: UnitValue,
    xl: UnitValue,
    "2xl": UnitValue,
    "3xl": UnitValue,
  }),
  spacing: z.object({
    px: UnitValue,
    0: UnitValue,
    "0.5": UnitValue,
    1: UnitValue,
    "1.5": UnitValue,
    2: UnitValue,
    "2.5": UnitValue,
    3: UnitValue,
    "3.5": UnitValue,
    4: UnitValue,
    5: UnitValue,
    6: UnitValue,
    7: UnitValue,
    8: UnitValue,
    9: UnitValue,
    10: UnitValue,
    11: UnitValue,
    12: UnitValue,
    14: UnitValue,
    16: UnitValue,
    20: UnitValue,
    24: UnitValue,
    28: UnitValue,
    32: UnitValue,
    36: UnitValue,
    40: UnitValue,
    44: UnitValue,
    48: UnitValue,
    52: UnitValue,
    56: UnitValue,
    60: UnitValue,
    64: UnitValue,
    72: UnitValue,
    80: UnitValue,
    96: UnitValue,
  }),
});

export type Theme = z.infer<typeof Theme>;
