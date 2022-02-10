import { useEffect, useState, useContext } from "react";

import { formatTransactionGraphInfo } from "../lib/graph";

import { Transaction } from "../types/etherscan";
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
          const response = await fetch(transactionsUrl);
          const result = await response.json();
          const transactions = result.result as Transaction[];
          const graphInfo = formatTransactionGraphInfo(transactions, 0);
          setGraphInfo(graphInfo);
          setRequestState(RequestState.RESOLVED);
          dispatch({
            type: ActionTypes.SET_TRANSACTIONS,
            value: transactions,
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
