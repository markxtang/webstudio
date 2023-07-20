import type {
  RgbValue,
  StyleProperty,
  StyleValue,
} from "@webstudio-is/css-data";
import type { EmbedTemplateStyleDecl } from "@webstudio-is/react-sdk";
import type { ComponentsType } from "..";
import { svgToBase64 } from "../../utils/to-base64";

const transparent: RgbValue = {
  type: "rgb",
  r: 0,
  g: 0,
  b: 0,
  alpha: 0,
};

const systemFont =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    .replace(/['"]/g, "")
    .split(/,\s*/);

export const base: ComponentsType = {
  Blockquote: {
    base: (theme) => [
      {
        property: "borderLeftWidth",
        value: { type: "unit", value: 2, unit: "px" },
      },
      {
        property: "borderLeftStyle",
        value: { type: "keyword", value: "solid" },
      },
      { property: "borderLeftColor", value: theme.color.base },
      {
        property: "paddingLeft",
        value: theme.spacing[4],
      },
    ],
  },
  Bold: {
    base: (theme) => [
      { property: "color", value: theme.color.base },
      { property: "fontWeight", value: { type: "keyword", value: "bold" } },
    ],
  },
  Box: {
    base: (theme, colorMode = "light") => [
      {
        property: "display",
        value: { type: "keyword", value: "flex" },
      },
      {
        property: "flexDirection",
        value: { type: "keyword", value: "column" },
      },
      { property: "color", value: theme.color.base },
      {
        property: "fontSize",
        value: theme.fontSize.base[0],
      },
      {
        property: "lineHeight",
        value: theme.fontSize.base[1].lineHeight,
      },
      {
        property: "fontFamily",
        value: { type: "fontFamily", value: systemFont },
      },
      {
        property: "width",
        value: { type: "unit", value: 100, unit: "%" },
      },
      ...expand("marginHorizontal", { type: "keyword", value: "auto" }),
      ...expand("borderRadius", theme.borderRadius.none),
    ],
    columns: (theme) => [
      {
        property: "display",
        value: { type: "keyword", value: "flex" },
      },
      {
        property: "columnGap",
        value: theme.spacing[6],
      },
    ],
    testimonialsContainer: (theme) => [
      {
        property: "display",
        value: { type: "keyword", value: "flex" },
      },
      {
        property: "columnGap",
        value: theme.spacing[6],
      },
      ...expand("padding", theme.spacing[8]),
    ],
    sectionContainer: (theme) => [...expand("padding", theme.spacing[8])],
    sectionContent: (theme) => [
      {
        property: "maxWidth",
        value: { type: "unit", value: 1024, unit: "px" },
      },
      ...expand("paddingHorizontal", theme.spacing[8]),
      ...expand("paddingVertical", theme.spacing[4]),
    ],
    horizontalLinks: (theme) => [
      { property: "display", value: { type: "keyword", value: "flex" } },
      {
        property: "rowGap",
        value: theme.spacing[8],
      },
      {
        property: "columnGap",
        value: theme.spacing[4],
      },
    ],
    rightAlignedNavigation: (theme) => [
      { property: "display", value: { type: "keyword", value: "flex" } },
      {
        property: "justifyContent",
        value: { type: "keyword", value: "flex-end" },
      },
    ],
    logoNav: (theme) => [
      { property: "display", value: { type: "keyword", value: "flex" } },
      {
        property: "justifyContent",
        value: { type: "keyword", value: "space-between" },
      },
      { property: "alignItems", value: { type: "keyword", value: "center" } },
    ],
    card: (theme) => [
      { property: "backgroundColor", value: theme.backgroundColor.base },
      { property: "color", value: theme.color.base },
      {
        property: "boxShadow",
        value: {
          type: "keyword",
          value: `0 3px 8px ${theme.boxShadowColor.base}`,
        },
      },
      ...expand("borderRadius", theme.borderRadius.lg),
      ...expand("padding", theme.spacing[4]),
    ],
    gradientVertical: (theme) => {
      const gradient =
        theme.gradientColorStops[
          Math.floor(Math.random() * theme.gradientColorStops.length)
        ];

      return [
        {
          property: "backgroundImage",
          value: {
            type: "layers",
            value: [
              {
                type: "keyword",
                value: `linear-gradient(180deg, ${gradient[0]}, ${gradient[1]})`,
              },
            ],
          },
        },
      ];
    },
    gradient45degrees: (theme) => {
      const gradient =
        theme.gradientColorStops[
          Math.floor(Math.random() * theme.gradientColorStops.length)
        ];

      return [
        {
          property: "backgroundImage",
          value: {
            type: "layers",
            value: [
              {
                type: "keyword",
                value: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
              },
            ],
          },
        },
      ];
    },
    withBackgroundPattern: (theme, colorMode) => {
      const bgs = Object.values(backgroundPatterns);
      const pattern = bgs[Math.floor(Math.random() * bgs.length)];

      return [
        {
          property: "backgroundImage",
          value: {
            type: "layers",
            value: [
              {
                type: "image",
                value: {
                  type: "url",
                  url: pattern(
                    colorMode === "light"
                      ? "rgba(0,0,0,0.2)"
                      : "rgba(255,255,255,0.2)"
                  ),
                },
              },
            ],
          },
        },
      ];
    },
  },
  Button: {
    base: (theme) => [
      { property: "backgroundColor", value: theme.backgroundColor.base },
      { property: "color", value: theme.color.base },
      { property: "cursor", value: { type: "keyword", value: "pointer" } },
      ...expand("borderWidth", {
        type: "unit",
        value: 1,
        unit: "px",
      }),
      { property: "whiteSpace", value: { type: "keyword", value: "nowrap" } },
      ...expand("borderStyle", { type: "keyword", value: "solid" }),
      ...expand("borderColor", theme.backgroundColor.base),
      ...expand("borderRadius", theme.borderRadius.DEFAULT),
      ...expand("paddingHorizontal", theme.spacing[3]),
      ...expand("paddingVertical", theme.spacing[2]),
    ],
    primary: (theme) => [
      { property: "backgroundColor", value: theme.backgroundColor.accent },
      { property: "color", value: theme.color.accent },
      ...expand("borderColor", theme.backgroundColor.accent),
    ],
    secondary: (theme) => [
      { property: "backgroundColor", value: theme.backgroundColor.secondary },
      { property: "color", value: theme.color.secondary },
      ...expand("borderColor", theme.backgroundColor.secondary),
    ],
    outline: (theme) => [
      { property: "backgroundColor", value: transparent },
      ...expand("borderWidth", {
        type: "unit",
        value: 1,
        unit: "px",
      }),
      ...expand("borderStyle", { type: "keyword", value: "solid" }),
      ...expand("borderColor", theme.color.base),
    ],
    round: (theme) => [
      ...expand("borderRadius", {
        type: "unit",
        value: 1.3,
        unit: "em",
      }),
    ],
    square: (theme) => [...expand("borderRadius", theme.borderRadius.none)],
  },
  // Checkbox: {},
  CodeText: {
    base: (theme) => [
      {
        property: "display",
        value: { type: "keyword", value: "inline-block" },
      },
      {
        property: "fontFamily",
        value: { type: "fontFamily", value: ["monospace"] },
      },
      { property: "backgroundColor", value: theme.backgroundColor.secondary },
      { property: "color", value: theme.color.secondary },
      ...expand("borderRadius", theme.borderRadius.DEFAULT),
    ],
    block: (theme) => [
      {
        property: "display",
        value: { type: "keyword", value: "inline-block" },
      },
      ...expand("borderRadius", theme.borderRadius.DEFAULT),
      ...expand("paddingHorizontal", theme.spacing[4]),
      ...expand("paddingVertical", theme.spacing[2]),
    ],
  },
  // ErrorMessage: {}
  Heading: {
    base: (theme) => [
      {
        property: "fontFamily",
        value: theme.fontFamily.headings,
      },
      {
        property: "fontSize",
        value: theme.fontSize["3xl"][0],
      },
      { property: "lineHeight", value: theme.fontSize["3xl"][1].lineHeight },
    ],
    small: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize["xl"][0],
      },
      { property: "lineHeight", value: theme.fontSize["xl"][1].lineHeight },
    ],
    medium: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize["4xl"][0],
      },
      { property: "lineHeight", value: theme.fontSize["4xl"][1].lineHeight },
    ],
    large: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize["5xl"][0],
      },
      { property: "lineHeight", value: theme.fontSize["5xl"][1].lineHeight },
    ],
    hero: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize["7xl"][0],
      },
      { property: "lineHeight", value: theme.fontSize["7xl"][1].lineHeight },
    ],
  },
  // HtmlEmbed: {}
  Image: {
    base: (theme) => [
      {
        property: "maxWidth",
        value: { type: "unit", value: 100, unit: "%" },
      },
      {
        property: "maxHeight",
        value: { type: "unit", value: 100, unit: "%" },
      },
      {
        property: "minWidth",
        value: { type: "unit", value: 1, unit: "px" },
      },
      ...expand("borderRadius", theme.borderRadius.xl),
    ],
    noRounded: (theme) => [...expand("borderRadius", theme.borderRadius.none)],
    roundedSmall: (theme) => [...expand("borderRadius", theme.borderRadius.md)],
    circle: (theme) => [...expand("borderRadius", theme.borderRadius.full)],
  },
  Input: {
    base: (theme) => [
      {
        property: "width",
        value: { type: "unit", value: 100, unit: "%" },
      },
      { property: "backgroundColor", value: theme.backgroundColor.elevate },
      { property: "color", value: theme.color.elevate },
      ...expand("borderRadius", theme.borderRadius.md),
      ...expand("borderWidth", {
        type: "unit",
        value: 1,
        unit: "px",
      }),
      ...expand("borderStyle", { type: "keyword", value: "solid" }),
      ...expand("borderColor", theme.backgroundColor.elevate),
      ...expand("paddingHorizontal", theme.spacing[3]),
      ...expand("paddingVertical", theme.spacing[2]),
      { property: "marginBottom", value: theme.spacing[4] },
    ],
  },
  Italic: {
    base: (theme) => [
      {
        property: "fontStyle",
        value: { type: "keyword", value: "italic" },
      },
    ],
  },
  Link: {
    base: (theme) => [
      { property: "color", value: theme.color.accent },
      {
        property: "textDecorationLine",
        value: { type: "keyword", value: "none" },
      },
    ],
    navLink: (theme) => [
      { property: "whiteSpace", value: { type: "keyword", value: "nowrap" } },
      ...expand("paddingHorizontal", theme.spacing[3]),
      ...expand("paddingVertical", theme.spacing[2]),
    ],
  },
  List: {
    base: (theme) => [
      {
        property: "listStyleType",
        value: { type: "keyword", value: "none" },
      },
      ...expand("padding", theme.spacing[0]),
    ],
  },
  ListItem: {
    base: (theme) => [
      {
        property: "listStyleType",
        value: { type: "keyword", value: "none" },
      },
    ],
  },
  // Paragraph: {}
  // RadioButton: {}
  RichTextLink: {
    base: (theme) => [
      { property: "color", value: theme.color.accent },
      {
        property: "textDecorationLine",
        value: { type: "keyword", value: "none" },
      },
    ],
  },
  Separator: {
    base: (theme) => [
      { property: "backgroundColor", value: theme.backgroundColor.elevate },
      { property: "height", value: { type: "unit", value: 1, unit: "px" } },
    ],
  },
  // Span: {},
  // Subscript: {},
  // SuccessMessage: {},
  // Superscript: {},
  Text: {
    base: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize.base[0],
      },
      {
        property: "lineHeight",
        value: theme.fontSize.base[1].lineHeight,
      },
      {
        property: "fontFamily",
        value: { type: "fontFamily", value: systemFont },
      },
    ],
    subtle: (theme) => [{ property: "color", value: theme.color.muted }],
    small: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize.sm[0],
      },
      {
        property: "lineHeight",
        value: theme.fontSize.sm[1].lineHeight,
      },
    ],
    medium: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize.lg[0],
      },
      {
        property: "lineHeight",
        value: theme.fontSize.lg[1].lineHeight,
      },
    ],
    large: (theme) => [
      {
        property: "fontSize",
        value: theme.fontSize["2xl"][0],
      },
      {
        property: "lineHeight",
        value: theme.fontSize["2xl"][1].lineHeight,
      },
    ],
  },
  Textarea: {
    base: (theme) => [
      {
        property: "width",
        value: { type: "unit", value: 100, unit: "%" },
      },
      { property: "backgroundColor", value: theme.backgroundColor.elevate },
      { property: "color", value: theme.color.elevate },
      ...expand("borderWidth", {
        type: "unit",
        value: 1,
        unit: "px",
      }),
      ...expand("borderStyle", { type: "keyword", value: "solid" }),
      ...expand("borderColor", theme.backgroundColor.elevate),
      ...expand("borderRadius", theme.borderRadius.md),
      ...expand("paddingHorizontal", theme.spacing[3]),
      ...expand("paddingVertical", theme.spacing[2]),
      { property: "marginBottom", value: theme.spacing[4] },
    ],
  },
  // Vimeo: {}
  // VimeoPlayButton: {}
  // VimeoPreviewImage: {}
  // VimeoSpinner: {}
};

// @todo remove all the as EmbedTemplateStyleDecl
const expand = function expand(
  property: StyleProperty | string,
  value: StyleValue
): EmbedTemplateStyleDecl[] {
  if (property.endsWith("Horizontal")) {
    return ["Right", "Left"].map(
      (side) =>
        ({
          property: `${property.slice(0, -10)}${side}`,
          value,
        } as EmbedTemplateStyleDecl)
    );
  }

  if (property.endsWith("Vertical")) {
    return ["Top", "Bottom"].map(
      (side) =>
        ({
          property: `${property.slice(0, -8)}${side}`,
          value,
        } as EmbedTemplateStyleDecl)
    );
  }

  if (property === "margin" || property === "padding") {
    return ["Top", "Right", "Bottom", "Left"].map(
      (side) =>
        ({ property: `${property}${side}`, value } as EmbedTemplateStyleDecl)
    );
  }

  if (property === "borderRadius") {
    return ["TopRight", "TopLeft", "BottomRight", "BottomLeft"].map(
      (side) =>
        ({ property: `border${side}Radius`, value } as EmbedTemplateStyleDecl)
    );
  } else if (property.startsWith("border")) {
    return ["Top", "Right", "Bottom", "Left"].map(
      (side) =>
        ({
          property: `border${side}${property.slice(6)}`,
          value,
        } as EmbedTemplateStyleDecl)
    );
  }

  return [{ property, value } as EmbedTemplateStyleDecl];
};

export const backgroundPatterns = {
  dots: (color: string) =>
    svgToBase64(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">\n  <defs>\n    <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">\n      <circle cx="10" cy="10" r="1" fill="${color}" />\n    </pattern>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#grid-pattern)" />\n</svg>`
    ),
  doubleDots: (color: string) =>
    svgToBase64(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">\n  <pattern id="stars" width="50" height="50" patternUnits="userSpaceOnUse">\n    <circle cx="25" cy="25" r="2" fill="rgba(0,0,0,0.1)" />\n    <circle cx="12.5" cy="12.5" r="1" fill="${color}" />\n  </pattern>\n  <rect fill="url(#stars)" width="100%" height="100%" />\n</svg>`
    ),
  graph: (color: string) =>
    svgToBase64(
      `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><g fill-rule='evenodd'><g fill='${color}' fill-opacity='0.28'><path opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/><path d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/></g></g></svg>`
    ),
  cross: (color: string) =>
    svgToBase64(
      `<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='${color}' fill-opacity='0.4'><path d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/></g></g></svg>`
    ),
};
