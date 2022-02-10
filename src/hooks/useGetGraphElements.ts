import { useCallback, useEffect, useState } from "react";

import { RequestState } from "../types/http";
import {
  TransactionsGraphInfo,
  ConnectionGraphInfo,
  GraphInfo,
  Node,
} from "../types/graph";

import useGetConnections from "./useGetConnections";
import useGetTransactions from "./useGetAddressTransactions";
import { setNodeLevels } from "../lib/graph";

import colors from "../styles/colors";

export default function useGetGraphElements(address: string) {
  const rootNode: Node = {
    data: {
      id: 0,
      color: colors.silver,
      label: address,
      level: null,
    },
  };
  const { graphInfo: socialGraphInfo, graphIsLoaded } = useGetConnections(
    address || "",
    rootNode
  );
  const {
    requestState: fetchTransactionsRequestState,
    graphInfo: transactionGraphInfo,
  } = useGetTransactions(address || "");
  const [loadingState, setLoadingState] = useState<RequestState>(
    RequestState.IDLE
  );
  const [elements, setElements] = useState<GraphInfo>({
    nodes: [],
    edges: [],
  });

  const updateLoadingState = useCallback(() => {
    let loadingState: RequestState = RequestState.IDLE;
    if (fetchTransactionsRequestState === RequestState.IDLE) {
      loadingState = RequestState.IDLE;
    }
    if (
      fetchTransactionsRequestState === RequestState.LOADING &&
      !graphIsLoaded
    ) {
      loadingState = RequestState.LOADING;
    }
    if (
      fetchTransactionsRequestState === RequestState.RESOLVED &&
      graphIsLoaded
    ) {
      loadingState = RequestState.RESOLVED;
    }

    setLoadingState(loadingState);
    return loadingState;
  }, [fetchTransactionsRequestState, graphIsLoaded]);

  const formatGraphElements = (
    transactionGraphInfo: TransactionsGraphInfo,
    socialGraphInfo: ConnectionGraphInfo
  ): GraphInfo => {
    const allNodes = [
      ...socialGraphInfo.nodes,
      ...transactionGraphInfo.nodes,
    ] as Node[];
    const allEdges = [...socialGraphInfo.edges, ...transactionGraphInfo.edges];
    return {
      nodes: setNodeLevels(allNodes),
      edges: allEdges,
    };
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
