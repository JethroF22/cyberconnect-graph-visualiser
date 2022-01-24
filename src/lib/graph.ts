import { Identity, IdentityType } from "../types/connections";
import { Node, Edge, GraphInfo } from "../types/graph";

export const formatGraphInfo = (
  identities: Identity[],
  rootNode: Node
): GraphInfo => {
  const nodes: Node[] = formatNodes(identities);
  const edges: Edge[] = formatEdges(identities, rootNode);

  return { nodes: [rootNode, ...nodes], edges };
};

export const formatNodes = (identities: Identity[]): Node[] => {
  return identities.map((identity, index) => ({
    data: {
      id: index + 1, // IDs start at 0 with rootNode
      label: `${identity.address} (${identity.ens})`,
      image:
        identity.avatar || "http://cdn.onlinewebfonts.com/svg/img_258083.png",
      color: "#000000",
    },
    position: {
      x: null,
      y: null,
    },
  }));
};

export const formatEdges = (identities: Identity[], rootNode: Node) => {
  return identities.map((identity, index) =>
    formatEdge(identity, rootNode, index)
  );
};

export const formatEdge = (
  identity: Identity,
  rootNode: Node,
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
    },
  };
};
