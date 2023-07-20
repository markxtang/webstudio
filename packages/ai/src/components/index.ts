import type { Theme } from "@webstudio-is/css-data";
import type { EmbedTemplateStyleDecl } from "@webstudio-is/react-sdk";

export { base as componentsBase } from "./base";
export type ComponentsType = Record<
  string,
  Record<
    string,
    (theme: Theme, colorMode?: "light" | "dark") => EmbedTemplateStyleDecl[]
  >
>;
