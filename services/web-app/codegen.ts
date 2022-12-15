import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.zora.co/graphql',
  documents: ['pages/**/*.tsx', 'components/**/*.tsx', '!utils/gql/**/*'],
  generates: {
    '.utils/gql/types/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;