import type { WsEmbedTemplate } from "@webstudio-is/react-sdk";
import { logos, social } from "../assets/logo";
import { traverseTemplate } from "./traverse-template";

export const collectDescriptions = function collectDescriptions(
  template: WsEmbedTemplate
) {
  const imagesDescriptions: string[] = [];

  traverseTemplate(template, (node) => {
    if (node.type === "instance") {
      const description = node.props?.find(
        (prop) =>
          prop.name === "alt" &&
          typeof prop.value === "string" &&
          prop.value.trim()
      );
      if (description && description.type === "string") {
        imagesDescriptions.push(description.value);
      }
    }
  });

  return imagesDescriptions;
};

type Icons = keyof typeof social;

export const generateImagesUrlsUnsplash = async function generateImagesUrls(
  descriptions: string[]
): Promise<string[]> {
  const availableIcons = Object.keys(social) as Icons[];

  return Promise.all(
    descriptions.map((description) => {
      const iconName = availableIcons.find((iconName) =>
        description.toLowerCase().includes(iconName)
      );

      if (
        typeof iconName === "string" &&
        typeof social[iconName] === "function"
      ) {
        return social[iconName]("currentColor");
      }

      const size = description.slice(0, description.indexOf(":"));
      const sizes = size.split("x");
      const width = Number(sizes[0]);
      const height = Number(sizes[1]);

      if (description.toLowerCase().includes("logo")) {
        const logo = logos[Math.floor(Math.random() * logos.length)];
        return logo({
          color: "currentColor",
          size: isNaN(height) ? "2em" : `${Math.min(50, height)}px`,
        });
      }

      let url = `https://source.unsplash.com/random/?${encodeURIComponent(
        description.slice(size.length + 1)
      )}&w=${width}&h=${height}`;

      if (isNaN(width) || isNaN(height)) {
        url = `https://source.unsplash.com/random/?${encodeURIComponent(
          description
        )}&w=250&h=250`;
      }

      return url;
    })
  );
};

export const insertImagesUrls = function insertImages(
  template: WsEmbedTemplate,
  descriptions: string[],
  imagesUrls: string[]
) {
  traverseTemplate(template, (node) => {
    if (node.type === "instance") {
      const altIndex = node.props?.findIndex(
        (prop) =>
          prop.name === "alt" &&
          typeof prop.value === "string" &&
          prop.value.trim()
      );

      const alt =
        node.props && altIndex != null && altIndex > -1
          ? node.props[altIndex]
          : null;

      if (altIndex != null && alt?.type === "string") {
        const index = descriptions.indexOf(alt.value);
        if (imagesUrls[index]) {
          if (node.props == null) {
            node.props = [];
          }

          // determine image size
          const size = alt.value.slice(0, alt.value.indexOf(":"));
          // const sizes = size.split("x");
          // const width = Number(sizes[0]);
          // const height = Number(sizes[1]);

          // Set size inline - disabled for now
          //
          // if (width && height && isSvg) {
          //   if (node.styles == null) {
          //     node.styles = [];
          //   }
          //   const idx = node.styles.findIndex(
          //     (decl) => decl.property === "maxWidth"
          //   );

          //   if (idx > -1) {
          //     node.styles[idx].value = {
          //       type: "unit",
          //       value: width,
          //       unit: "px",
          //     };
          //   } else {
          //     node.styles.push({
          //       property: "maxWidth",
          //       value: { type: "unit", value: width, unit: "px" },
          //     });
          //   }
          //   console.log(
          //     alt.value,
          //     width,
          //     height,
          //     JSON.stringify(node.styles, null, 2)
          //   );
          // }

          const isSvg = imagesUrls[index].startsWith("<svg");

          if (isSvg) {
            alt.name = "title";
            node.component = "HtmlEmbed";
          }
          // remove size from images alt (description)
          alt.value = alt.value.slice(size.length + 1);
          node.props[altIndex] = alt;

          if (isSvg) {
            node.props.push({
              type: "string",
              name: "code",
              value: imagesUrls[index],
            });
          } else {
            node.props.push({
              type: "string",
              name: "src",
              value: imagesUrls[index],
            });
          }
        }
      }
    }
  });
};
