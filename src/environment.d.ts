declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_ALCHEMY_URL: string;
      REACT_APP_ENVIRONMENT: "STAGING" | "PRODUCTION";
    }
  }
}

export {};
