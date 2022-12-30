import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.zora.co/graphql',
  documents: ['pages/**/*.tsx', 'components/**/*.tsx', 'querys/**/*.ts', '!utils/gql/**/*'],
  generates: {
    '.utils/gql/types/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;