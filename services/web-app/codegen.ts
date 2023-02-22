import { CodegenConfig } from "@graphql-codegen/cli";

//TODO: Can't use env variables here

const config: CodegenConfig = {
  generates: {
    "./.utils/internalTypes/": {
      documents: [
        "querys/internal/*.ts",
        "!utils/gql/**/*",
        "!querys/zora/*.ts",
      ],
      schema: `http://localhost:4001/graphql`,
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
