import { describe, expect, test } from "@jest/globals";
import type { Theme } from "@webstudio-is/css-data";
import { EmbedTemplateStyleDecl } from "@webstudio-is/react-sdk";
import { base as componentsStyles } from "./";

describe("components styles", () => {
  for (const [componentName, styles] of Object.entries(componentsStyles)) {
    for (const [variantName, getVariantStyles] of Object.entries(styles)) {
      test(`${componentName}.${variantName} styles are valid`, () => {
        const styleDecls = getVariantStyles(theme);
        styleDecls.forEach((styleDecl) => {
          expect(() => EmbedTemplateStyleDecl.parse(styleDecl)).not.toThrow();
        });
      });
    }
  }
});

// prettier-ignore
const theme: Theme = {
  "backgroundColor": {
    "base": {
        "type": "rgb",
        "alpha": 1,
        "r": 252,
        "g": 231,
        "b": 243
      }
    ,
    "elevate":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 248,
        "g": 214,
        "b": 232
      }
    ,
    "primary":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 248,
        "g": 214,
        "b": 232
      }
    ,
    "secondary":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 252,
        "g": 231,
        "b": 243
      }
    ,
    "accent":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 182,
        "b": 217
      }
    ,
    "muted":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 252,
        "g": 231,
        "b": 243
      }
    ,
    "destructive":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 214,
        "b": 232
      }

  },
  "color": {
    "base":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 51,
        "g": 51,
        "b": 51
      }
    ,
    "elevate":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 102,
        "g": 102,
        "b": 102
      }
    ,
    "primary":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 51,
        "g": 51,
        "b": 51
      }
    ,
    "secondary":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 102,
        "g": 102,
        "b": 102
      }
    ,
    "accent":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 182,
        "b": 217
      }
    ,
    "muted":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 153,
        "g": 153,
        "b": 153
      }
    ,
    "destructive":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 51,
        "b": 51
      }

  },
  "border": {
    "base":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 204,
        "g": 204,
        "b": 204
      }
    ,
    "elevate":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 204,
        "g": 204,
        "b": 204
      }
    ,
    "primary":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 204,
        "g": 204,
        "b": 204
      }
    ,
    "secondary":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 204,
        "g": 204,
        "b": 204
      }
    ,
    "accent":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 182,
        "b": 217
      }
    ,
    "muted":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 204,
        "g": 204,
        "b": 204
      }
    ,
    "destructive":
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 51,
        "b": 51
      }

  },
  "boxShadowColor": {
    "base":
      {
        "type": "rgb",
        "alpha": 0.1,
        "r": 0,
        "g": 0,
        "b": 0
      }
    ,
    "elevate":
      {
        "type": "rgb",
        "alpha": 0.2,
        "r": 0,
        "g": 0,
        "b": 0
      }
    ,
    "primary":
      {
        "type": "rgb",
        "alpha": 0.1,
        "r": 0,
        "g": 0,
        "b": 0
      }
    ,
    "secondary":
      {
        "type": "rgb",
        "alpha": 0.2,
        "r": 0,
        "g": 0,
        "b": 0
      }
    ,
    "accent":
      {
        "type": "rgb",
        "alpha": 0.5,
        "r": 255,
        "g": 182,
        "b": 217
      }
    ,
    "muted":
      {
        "type": "rgb",
        "alpha": 0.1,
        "r": 0,
        "g": 0,
        "b": 0
      }
    ,
    "destructive":
      {
        "type": "rgb",
        "alpha": 0.5,
        "r": 255,
        "g": 51,
        "b": 51
      }

  },
  "gradientColorStops": [
    [
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 182,
        "b": 217
      },
      {
        "type": "rgb",
        "alpha": 1,
        "r": 252,
        "g": 231,
        "b": 243
      }
    ],
    [
      {
        "type": "rgb",
        "alpha": 1,
        "r": 252,
        "g": 231,
        "b": 243
      },
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 182,
        "b": 217
      }
    ],
    [
      {
        "type": "rgb",
        "alpha": 1,
        "r": 255,
        "g": 182,
        "b": 217
      },
      {
        "type": "rgb",
        "alpha": 1,
        "r": 252,
        "g": 231,
        "b": 243
      }
    ]
  ],
  "fontFamily": {
    "base": {
      "type": "fontFamily",
      "value": [
        "'Roboto', sans-serif"
      ]
    },
    "headings": {
      "type": "fontFamily",
      "value": [
        "'Playfair Display', serif"
      ]
    }
  },
  "fontSize": {
    "xs": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 0.75
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 1
        }
      }
    ],
    "sm": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 0.875
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 1.25
        }
      }
    ],
    "base": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 1
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 1.5
        }
      }
    ],
    "lg": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 1.125
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 1.75
        }
      }
    ],
    "xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 1.25
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 1.75
        }
      }
    ],
    "2xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 1.5
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 2
        }
      }
    ],
    "3xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 1.875
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 2.25
        }
      }
    ],
    "4xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 2.25
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "rem",
          "value": 2.5
        }
      }
    ],
    "5xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 3
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "number",
          "value": 1
        }
      }
    ],
    "6xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 3.75
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "number",
          "value": 1
        }
      }
    ],
    "7xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 4.5
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "number",
          "value": 1
        }
      }
    ],
    "8xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 6
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "number",
          "value": 1
        }
      }
    ],
    "9xl": [
      {
        "type": "unit",
        "unit": "rem",
        "value": 8
      },
      {
        "lineHeight": {
          "type": "unit",
          "unit": "number",
          "value": 1
        }
      }
    ]
  },
  "borderRadius": {
    "none": {
      "type": "unit",
      "unit": "px",
      "value": 0
    },
    "sm": {
      "type": "unit",
      "unit": "rem",
      "value": 0.125
    },
    "DEFAULT": {
      "type": "unit",
      "unit": "rem",
      "value": 0.25
    },
    "md": {
      "type": "unit",
      "unit": "rem",
      "value": 0.375
    },
    "lg": {
      "type": "unit",
      "unit": "rem",
      "value": 0.5
    },
    "xl": {
      "type": "unit",
      "unit": "rem",
      "value": 0.75
    },
    "2xl": {
      "type": "unit",
      "unit": "rem",
      "value": 1
    },
    "3xl": {
      "type": "unit",
      "unit": "rem",
      "value": 1.5
    },
    "full": {
      "type": "unit",
      "unit": "px",
      "value": 9999
    }
  },
  "spacing": {
    "0": {
      "type": "unit",
      "unit": "px",
      "value": 0
    },
    "1": {
      "type": "unit",
      "unit": "rem",
      "value": 0.25
    },
    "2": {
      "type": "unit",
      "unit": "rem",
      "value": 0.5
    },
    "3": {
      "type": "unit",
      "unit": "rem",
      "value": 0.75
    },
    "4": {
      "type": "unit",
      "unit": "rem",
      "value": 1
    },
    "5": {
      "type": "unit",
      "unit": "rem",
      "value": 1.25
    },
    "6": {
      "type": "unit",
      "unit": "rem",
      "value": 1.5
    },
    "7": {
      "type": "unit",
      "unit": "rem",
      "value": 1.75
    },
    "8": {
      "type": "unit",
      "unit": "rem",
      "value": 2
    },
    "9": {
      "type": "unit",
      "unit": "rem",
      "value": 2.25
    },
    "10": {
      "type": "unit",
      "unit": "rem",
      "value": 2.5
    },
    "11": {
      "type": "unit",
      "unit": "rem",
      "value": 2.75
    },
    "12": {
      "type": "unit",
      "unit": "rem",
      "value": 3
    },
    "14": {
      "type": "unit",
      "unit": "rem",
      "value": 3.5
    },
    "16": {
      "type": "unit",
      "unit": "rem",
      "value": 4
    },
    "20": {
      "type": "unit",
      "unit": "rem",
      "value": 5
    },
    "24": {
      "type": "unit",
      "unit": "rem",
      "value": 6
    },
    "28": {
      "type": "unit",
      "unit": "rem",
      "value": 7
    },
    "32": {
      "type": "unit",
      "unit": "rem",
      "value": 8
    },
    "36": {
      "type": "unit",
      "unit": "rem",
      "value": 9
    },
    "40": {
      "type": "unit",
      "unit": "rem",
      "value": 10
    },
    "44": {
      "type": "unit",
      "unit": "rem",
      "value": 11
    },
    "48": {
      "type": "unit",
      "unit": "rem",
      "value": 12
    },
    "52": {
      "type": "unit",
      "unit": "rem",
      "value": 13
    },
    "56": {
      "type": "unit",
      "unit": "rem",
      "value": 14
    },
    "60": {
      "type": "unit",
      "unit": "rem",
      "value": 15
    },
    "64": {
      "type": "unit",
      "unit": "rem",
      "value": 16
    },
    "72": {
      "type": "unit",
      "unit": "rem",
      "value": 18
    },
    "80": {
      "type": "unit",
      "unit": "rem",
      "value": 20
    },
    "96": {
      "type": "unit",
      "unit": "rem",
      "value": 24
    },
    "px": {
      "type": "unit",
      "unit": "px",
      "value": 1
    },
    "0.5": {
      "type": "unit",
      "unit": "rem",
      "value": 0.125
    },
    "1.5": {
      "type": "unit",
      "unit": "rem",
      "value": 0.375
    },
    "2.5": {
      "type": "unit",
      "unit": "rem",
      "value": 0.625
    },
    "3.5": {
      "type": "unit",
      "unit": "rem",
      "value": 0.875
    }
  }
}
