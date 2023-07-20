import type { ComponentsType } from "@webstudio-is/ai";
import type { Theme } from "@webstudio-is/css-data";
import { Flex } from "@webstudio-is/design-system";
import type { Entries } from "type-fest";

export default function ComponentsViewer({
  components,
  theme,
}: {
  components: ComponentsType;
  theme: Theme;
}) {
  return (
    <Flex>
      {(Object.entries(components) as Entries<Components>).map(
        ([name, variants]) => {}
      )}
    </Flex>
  );
}

const componentsToInstances = (components: ComponentsType) => {};
