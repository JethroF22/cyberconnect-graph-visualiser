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

const formatNodes = (identities: Identity[]) => {
  return identities.map((identity, index) => ({
    id: index + 1, // IDs start at 0 with rootNode
    label: `${identity.address} (${identity.ens})`,
    title: identity.address,
    shape: "circularImage",
    image:
      identity.avatar || "http://cdn.onlinewebfonts.com/svg/img_258083.png",
  }));
};

const formatEdges = (identities: Identity[], rootNode: Node) => {
  return identities.map((identity, index) => {
    const id = index + 1;
    const fromId = identity.type === IdentityType.FOLLOWED ? id : rootNode.id;
    const toId = identity.type === IdentityType.FOLLOWING ? id : rootNode.id;
    return {
      from: fromId,
      to: toId,
    };
  });
};

export const options = {
  edges: {
    color: "#95d1fe",
    length: 750,
  },
  height: "1000px",
};
