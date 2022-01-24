import { Identity, IdentityType } from "../../types/connections";
import { Node } from "../../types/graph";
import { formatNodes, formatEdge } from "../graph";

describe("Given the `graph` library module", () => {
  const rootNode: Node = {
    data: {
      id: 0,
      label: `0xc0ffee254729296a45a3885639AC7E10F9d54979 (user.eth)`,
      image:
        "https://png.pngtree.com/png-clipart/20190920/original/pngtree-user-flat-character-avatar-png-png-image_4643588.jpg",
    },
    position: {
      x: Math.random() * 100,
      y: Math.random() * 100,
    },
  };
  const identities: Identity[] = [
    {
      address: "0x002556d2ff1766dc2dcfe95c3066745c0eb2d885",
      domain: "test1.eth",
      ens: "test1.eth",
      avatar:
        "https://png.pngtree.com/png-clipart/20190904/original/pngtree-user-cartoon-avatar-pattern-flat-avatar-png-image_4492883.jpg",
      type: IdentityType.FOLLOWING,
    },
    {
      address: "0x0029566ff9fea60fb57c8f27bf631384fef2bccf",
      domain: "test2.eth",
      ens: "test2.eth",
      avatar: "",
      type: IdentityType.FOLLOWING,
    },
    {
      address: "0x00308e305251a726477ee87d6d2f13911c883f88",
      domain: "test3.eth",
      ens: "test3.eth",
      avatar:
        "https://png.pngtree.com/png-clipart/20201209/original/pngtree-love-cartoon-couple-avatar-png-image_5676323.jpg",
      type: IdentityType.FOLLOWED,
    },
  ];

  describe("And the `formatNodes` function", () => {
    it("when a list of valid identities is supplied, then it formats them into a list of valid nodes", () => {
      const nodes = formatNodes(identities);

      expect(nodes.length).toBe(3);
      nodes.forEach((node, index) => {
        expect(node.data).toEqual(
          expect.objectContaining({
            id: index + 1,
            label: `${identities[index].address} (${identities[index].ens})`,
          })
        );
      });
    });
  });

  describe("And the `formatEdge` function", () => {
    it("when the identity of an addressed being followed is supplied, then it produces the correct edge", () => {
      const edge = formatEdge(identities[0], rootNode, 0);
      const nodes = formatNodes(identities);

      expect(edge.data).toEqual(
        expect.objectContaining({
          source: rootNode.data.id,
          target: nodes[0].data.id,
        })
      );
    });

    it("when the identity of a followed addressed is supplied, then it produces the correct edge", () => {
      const edge = formatEdge(identities[2], rootNode, 2);
      const nodes = formatNodes(identities);

      expect(edge.data).toEqual(
        expect.objectContaining({
          source: nodes[2].data.id,
          target: rootNode.data.id,
        })
      );
    });
  });
});
