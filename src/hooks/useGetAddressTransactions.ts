import { useEffect, useState, useContext } from "react";

import {
  filterDuplicateTransactions,
  formatTransactionGraphInfo,
} from "../lib/graph";

import { Transaction, TransactionType } from "../types/etherscan";
import { RequestState } from "../types/http";
import { TransactionsGraphInfo } from "../types/graph";
import { ActionTypes } from "../types/appContext";

import { AppContext } from "../context/AppContext";

export default function useGetTransactions(address: string) {
  const [graphInfo, setGraphInfo] = useState<TransactionsGraphInfo>({
    nodes: [],
    edges: [],
  });
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    if (address) {
      try {
        setRequestState(RequestState.LOADING);
        const getTransactions = async () => {
          const transactionsUrl = `${process.env.REACT_APP_ETHERSCAN_TRANSACTIONS_URL}&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
          const erc20TransfersUrl = `${process.env.REACT_APP_ETHERSCAN_ERC20_TRANSFERS_URL}&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
          const erc721TransfersUrl = `${process.env.REACT_APP_ETHERSCAN_ERC721_TRANSFERS_URL}&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
          const [
            transactionsResponse,
            erc20TransfersResponse,
            erc721TransfersResponse,
          ] = await Promise.all([
            fetch(transactionsUrl),
            fetch(erc20TransfersUrl),
            fetch(erc721TransfersUrl),
          ]);
          const transactionsResult = await transactionsResponse.json();
          const transactions = transactionsResult.result as Transaction[];
          const erc20TransfersResult = await erc20TransfersResponse.json();
          const erc20Transfers = erc20TransfersResult.result as Transaction[];
          const erc721TransfersResult = await erc721TransfersResponse.json();
          const erc721Transfers = erc721TransfersResult.result as Transaction[];
          const graphInfo = formatTransactionGraphInfo(transactions, 0);
          const deduplicatedTransactions = filterDuplicateTransactions(
            transactions,
            erc20Transfers,
            erc721Transfers
          );
          const allTransactions = [
            ...deduplicatedTransactions.map((transaction) => ({
              ...transaction,
              type: TransactionType.STANDARD_TRANSACTION,
            })),
            ...erc20Transfers.map((transaction) => ({
              ...transaction,
              type: TransactionType.ERC20_TRANSFER,
            })),
            ...erc721Transfers.map((transaction) => ({
              ...transaction,
              type: TransactionType.ERC721_TRANSFER,
            })),
          ];

          setGraphInfo(graphInfo);
          setRequestState(RequestState.RESOLVED);
          dispatch({
            type: ActionTypes.SET_TRANSACTIONS,
            value: allTransactions,
          });
        };
        getTransactions();
      } catch (error) {
        setRequestState(RequestState.REJECTED);
        console.log("error", error);
      }
    }
  }, [address]);

  return { graphInfo, requestState };
}
