import { useEffect, useState } from "react";
import { formatTransactionGraphInfo } from "../lib/graph";

import { Transaction } from "../types/etherscan";
import { RequestState } from "../types/http";
import { TransactionsGraphInfo } from "../types/graph";

export default function useGetTransactions(address: string) {
  const [graphInfo, setGraphInfo] = useState<TransactionsGraphInfo>({
    nodes: [],
    edges: [],
  });
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    try {
      setRequestState(RequestState.LOADING);
      const getTransactions = async () => {
        const transactionsUrl = `${process.env.REACT_APP_ETHERSCAN_TRANSACTIONS_URL}&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
        const response = await fetch(transactionsUrl);
        const result = await response.json();
        const graphInfo = formatTransactionGraphInfo(
          result.result as Transaction[],
          0
        );
        setGraphInfo(graphInfo);
        setRequestState(RequestState.RESOLVED);
      };
      getTransactions();
    } catch (error) {
      setRequestState(RequestState.REJECTED);
      console.log("error", error);
    }
  }, []);

  return { graphInfo, requestState };
}
