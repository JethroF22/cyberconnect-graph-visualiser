import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

import {
  ERC20Transfer,
  Transaction,
  TransactionType,
} from "../types/etherscan";

export const formatErc20Value = (transaction: ERC20Transfer) => {
  const decimals = parseInt(transaction.tokenDecimal);
  if (decimals === 0) {
    return transaction.value;
  }
  const value = parseInt(transaction.value);
  const result = value / Math.pow(10, decimals);
  return result;
};

export const convertToEth = (value: string) => {
  const parsedValue = ethers.BigNumber.from(value);
  return formatUnits(parsedValue);
};

export const formatLabel = (
  transaction: Transaction,
  searchedAddress: string
) => {
  const received =
    searchedAddress.toLowerCase() === transaction.to.toLowerCase();
  if (transaction.type === TransactionType.STANDARD_TRANSACTION) {
    return `${received ? "Recieved" : "Sent"} ${convertToEth(
      transaction.value
    )}ETH`;
  }
  if (transaction.type === TransactionType.ERC20_TRANSFER) {
    return `${received ? "Recieved" : "Sent"} ${formatErc20Value(
      transaction as ERC20Transfer
    )}${(transaction as ERC20Transfer).tokenSymbol}`;
  }
};
