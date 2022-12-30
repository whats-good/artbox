declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALCHEMY_API_KEY: string;
      NEXT_PUBLIC_ALCHEMY_API_KEY: string;
      NEXT_PUBLIC_ZORA_GRAPHQL_URI: string;
      ZORA_GRAPHQL_URI: string;
      USER_API: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}