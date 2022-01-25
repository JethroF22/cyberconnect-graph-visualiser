import { Identity, IdentityType } from "../types/connections";
import { Transaction } from "../types/etherscan";
import {
  ConnectionGraphInfo,
  ConnectionNode,
  Edge,
  TransactionNode,
  TransactionsGraphInfo,
} from "../types/graph";

export const formatConnectionGraphInfo = (
  identities: Identity[],
  rootNode: ConnectionNode
): ConnectionGraphInfo => {
  const nodes: ConnectionNode[] = formatConnectionNodes(identities);
  const edges: Edge[] = formatConnectionEdges(identities, rootNode);

  return { nodes: [rootNode, ...nodes], edges };
};

export const formatConnectionNodes = (
  identities: Identity[]
): ConnectionNode[] => {
  return identities.map((identity, index) => ({
    data: {
      id: index + 1, // IDs start at 0 with rootNode
      label: `${identity.address} (${identity.ens})`,
      image:
        identity.avatar || "http://cdn.onlinewebfonts.com/svg/img_258083.png",
      color: "#846a6a",
      ...identity,
    },
    position: {
      x: null,
      y: null,
    },
  }));
};

export const formatConnectionEdges = (
  identities: Identity[],
  rootNode: ConnectionNode
) => {
  return identities.map((identity, index) =>
    formatConnectionEdge(identity, rootNode, index)
  );
};

export const formatConnectionEdge = (
  identity: Identity,
  rootNode: ConnectionNode,
  index: number
): Edge => {
  const id = index + 1;
  const sourceId =
    identity.type === IdentityType.FOLLOWED ? id : rootNode.data.id;
  const targetId =
    identity.type === IdentityType.FOLLOWING ? id : rootNode.data.id;
  const label =
    identity.type === IdentityType.FOLLOWING ? "following" : "followed by";
  return {
    data: {
      source: sourceId,
      target: targetId,
      label,
      color: "#846a6a",
    },
  };
};

export const formatTransactionGraphInfo = (
  transactions: Transaction[],
  rootNodeIndex: number
): TransactionsGraphInfo => {
  const nodes: TransactionNode[] = formatTransactionNodes(transactions, 80);
  const edges: Edge[] = formatTransactionEdges(transactions, rootNodeIndex, 80);

  return { nodes, edges };
};

export const formatTransactionNodes = (
  transactions: Transaction[],
  startingIndex: number
) => {
  return transactions.map((transaction, index) => ({
    data: {
      id: startingIndex + index + 1, // IDs start at 0 with rootNode
      label: `${transaction.to}`,
      color: "#353b3c",
      ...transaction,
    },
    position: {
      x: null,
      y: null,
    },
  }));
};

export const formatTransactionEdges = (
  transactions: Transaction[],
  rootNodeIndex: number,
  startingIndex: number
) => {
  return transactions.map((transaction, index) =>
    formatTransactionEdge(transaction, rootNodeIndex, index + startingIndex)
  );
};

export const formatTransactionEdge = (
  transaction: Transaction,
  rootNodeIndex: number,
  index: number
) => {
  const id = index + 1;
  const sourceId =
    transaction.to !== "" || transaction.contractAddress !== ""
      ? id
      : rootNodeIndex;
  const targetId = transaction.from !== "" ? rootNodeIndex : id;
  const label = getTransactionLabel(transaction);
  return {
    data: {
      source: sourceId,
      target: targetId,
      label,
      color: "#353b3c",
    },
  };
};

export const getTransactionLabel = (transaction: Transaction) => {
  if (transaction.contractAddress !== "") {
    return "interacted with";
  }
  if (transaction.to !== "") {
    return "sent to";
  }
  if (transaction.from !== "") {
    return "received from";
  }
  return "";
};
