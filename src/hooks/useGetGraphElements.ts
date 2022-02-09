import { useCallback, useEffect, useState } from "react";

import { RequestState } from "../types/http";
import { TransactionsGraphInfo, ConnectionGraphInfo } from "../types/graph";

import useGetConnections from "./useGetConnections";
import useGetTransactions from "./useGetAddressTransactions";

export default function useGetGraphElements(address: string) {
  const { graphInfo: socialGraphInfo, graphIsLoaded } = useGetConnections(
    address || ""
  );
  const {
    requestState: fetchTransactionsRequestState,
    graphInfo: transactionGraphInfo,
  } = useGetTransactions(address || "");
  const [loadingState, setLoadingState] = useState<RequestState>(
    RequestState.IDLE
  );
  const [elements, setElements] = useState<any[]>([]);

  const updateLoadingState = useCallback(() => {
    if (fetchTransactionsRequestState === RequestState.IDLE) {
      setLoadingState(RequestState.IDLE);
    }
    if (
      fetchTransactionsRequestState === RequestState.LOADING &&
      !graphIsLoaded
    ) {
      setLoadingState(RequestState.LOADING);
    }
    if (
      fetchTransactionsRequestState === RequestState.RESOLVED &&
      graphIsLoaded
    ) {
      setLoadingState(RequestState.RESOLVED);
    }
  }, [fetchTransactionsRequestState, graphIsLoaded]);

  const formatGraphElements = (
    transactionGraphInfo: TransactionsGraphInfo,
    socialGraphInfo: ConnectionGraphInfo
  ) => {
    return [];
  };

  useEffect(() => {
    if (address) {
      updateLoadingState();
      const formattedElements = formatGraphElements(
        transactionGraphInfo,
        socialGraphInfo
      );
      setElements(formattedElements);
    }
  }, [address, transactionGraphInfo, socialGraphInfo, updateLoadingState]);

  return { loadingState, elements };
}
