import escapeStringRegexp from "escape-string-regexp";

export const formatPrompt = function getMessage(
  prompts: Record<string, string>,
  template: string
) {
  let message = template;
  Object.entries(prompts).forEach(([key, value]) => {
    if (typeof value === "string") {
      message = message.replace(
        new RegExp(`{${escapeStringRegexp(key)}}`, "g"),
        value.replace(/`/g, "\\`")
      );
    }
  });
  return message;
};
