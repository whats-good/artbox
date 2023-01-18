import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: ['pages/**/*.tsx', 'components/**/*.tsx', 'querys/**/*.ts', '!utils/gql/**/*'],
  generates: {
    '.utils/internalTypes': {
      schema: process.env.INTERNAL_API,
      preset: 'client',
      plugins: ['typescript'],
    },
    '.utils/zoraTypes': {
      schema: process.env.ZORA_GRAPHQL_URI,
      preset: 'client',
      plugins: ['typescript'],
    },
  },
};

export default config;