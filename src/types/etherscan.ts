export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  type: TransactionType;
}

export interface ERC20Transfer extends Transaction {
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
}

export interface ERC721Transfer extends ERC20Transfer {
  tokenID: string;
}

export interface EtherscanTransactionsResponse {
  status: string;
  message: string;
  result: Transaction[];
}

export enum TransactionType {
  ERC20_TRANSFER = "ERC20_TRANSFER",
  ERC721_TRANSFER = "ERC721_TRANSFER",
  STANDARD_TRANSACTION = "STANDARD_TRANSACTION",
}
