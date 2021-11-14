declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_SOCKET_URL: string;

      GITHUB_ID: string;
      GITHUB_SECRET: string;
      LINE_ID: string;
      LINE_SECRET: string;
      DISCORD_ID: string;
      DISCORD_SECRET: string;

      JWT_SIGNING_PRIVATE_KEY: string;
      SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
