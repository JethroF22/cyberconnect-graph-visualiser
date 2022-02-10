declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_ALCHEMY_URL: string;
      REACT_APP_ENVIRONMENT: "STAGING" | "PRODUCTION";
      REACT_APP_ETHERSCAN_TRANSACTIONS_URL: string;
      REACT_APP_ETHERSCAN_BALANCE_URL: string;
      REACT_APP_ETHERSCAN_ERC20_TRANSFERS_URL: string;
      REACT_APP_ETHERSCAN_ERC721_TRANSFERS_URL: string;
      REACT_APP_ETHERSCAN_API_KEY: string;
    }
  }
}

export {};
