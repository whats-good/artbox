import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./.utils/internalTypes/": {
      documents: [
        "querys/internal/*.ts",
        "!utils/gql/**/*",
        "!querys/zora/*.ts",
      ],
      schema: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
      preset: "client",
      plugins: ["typescript"],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./.utils/zoraTypes/": {
      documents: [
        "querys/zora/*.ts",
        "!utils/gql/**/*",
        "!querys/internal/*.ts",
      ],
      // schema: process.env.NEXT_PUBLIC_ZORA_GRAPHQL_URI,
      schema: "https://api.zora.co/graphql",
      preset: "client",
      plugins: ["typescript"],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
