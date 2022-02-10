import { Identity, IdentityType } from "../types/connections";
import { Transaction } from "../types/etherscan";
import {
  ConnectionGraphInfo,
  ConnectionNode,
  Edge,
  Node,
  TransactionNode,
  TransactionsGraphInfo,
} from "../types/graph";

import colors from "../styles/colors";

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
      color:
        identity.type === IdentityType.FOLLOWED
          ? colors.richBlack
          : colors.darkPurple,
      level: null,
      ...identity,
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
      color: colors.darkSkyBlue,
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

export const filterDuplicateTransactions = (
  transactions: Transaction[],
  erc20Transfers: Transaction[],
  erc721Transfers: Transaction[]
) => {
  const erc20TransferHashes = erc20Transfers.map(
    (transaction) => transaction.hash
  );
  const erc721TransferHashes = erc721Transfers.map(
    (transaction) => transaction.hash
  );

  return transactions.filter(
    (transaction) =>
      !erc20TransferHashes.includes(transaction.hash) &&
      !erc721TransferHashes.includes(transaction.hash) &&
      transaction.value !== "0"
  );
};

export const formatTransactionNodes = (
  transactions: Transaction[],
  startingIndex: number
) => {
  return transactions.map((transaction, index) => ({
    data: {
      id: startingIndex + index + 1, // IDs start at 0 with rootNode
      label: `${transaction.to}`,
      color: colors.onyx,
      level: null,
      ...transaction,
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

const calculateNumLevels = (nodes: Node[]): number => {
  let level = 1;
  let numNodesPerLevel = 5;
  let levelBreakPoint = 5;

  return nodes.reduce((previous: number, current: Node, index) => {
    if (index === levelBreakPoint) {
      level += 1;
      numNodesPerLevel = 5 * level;
      levelBreakPoint = levelBreakPoint + numNodesPerLevel;
    }
    return level;
  }, 1);
};

const assignNodeLevels = (nodes: Node[], numLevels: number): Node[] => {
  let level = 1;
  let numNodesPerLevel = 5;
  let levelBreakPoint = 5;
  return nodes.map((node: Node, index: number) => {
    if (index === levelBreakPoint) {
      level += 1;
      numNodesPerLevel = 5 * level;
      levelBreakPoint = levelBreakPoint + numNodesPerLevel;
    }

    return {
      ...node,
      data: {
        ...node.data,
        level: numLevels - level,
      },
    };
  });
};

export const setNodeLevels = (nodes: Node[]) => {
  if (nodes.length > 0) {
    let rootNode = nodes.shift() as Node;
    const numLevels = calculateNumLevels(nodes);

    rootNode = {
      data: {
        ...rootNode.data,
        level: numLevels,
      },
    };

    shuffleArray(nodes);

    const nodesWithLevels = assignNodeLevels(nodes, numLevels);
    return [rootNode, ...nodesWithLevels];
  }

  return [];
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
