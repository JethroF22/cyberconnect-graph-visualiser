import { useEffect, useState } from "react";
import { useQuery } from "react-apollo";

import { following } from "../graphql/queries";
import { formatGraphInfo } from "../lib/graph";
import { Identity, IdentityType } from "../types/connections";
import { GraphInfo, Node } from "../types/graph";

export default function useGetConnections(address: string) {
  const { loading, data } = useQuery(following, {
    variables: {
      address: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E",
    },
  });
  const [graphIsLoaded, setGraphLoadedState] = useState(false);
  const [graphInfo, setGraphInfo] = useState<GraphInfo>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    if (!loading && data) {
      const rootNode: Node = {
        data: {
          id: 0,
          label: `${data.identity.address} (${data.identity.ens})`,
          // title: data.identity.address,
          image:
            data.identity.avatar ||
            "http://cdn.onlinewebfonts.com/svg/img_258083.png",
          color: "#000000",
        },
        position: {
          x: 0,
          y: 0,
        },
      };
      const followedAddresses: Identity[] = data.identity.followers.list.map(
        (identity: Identity) => ({ ...identity, type: IdentityType.FOLLOWED })
      );
      const followingAddresses: Identity[] = data.identity.followers.list.map(
        (identity: Identity) => ({ ...identity, type: IdentityType.FOLLOWING })
      );
      const graphInfo = formatGraphInfo(
        [...followedAddresses, ...followingAddresses],
        rootNode
      );

      graphInfo.nodes = graphInfo.nodes.map((node, index) => {
        const angle = (index * 2 * Math.PI) / graphInfo.nodes.length;
        const mappedNode = {
          data: node.data,
          position: {
            x: 100 * Math.cos(angle),
            y: 100 * Math.sin(angle),
          },
        };
        return mappedNode;
      });
      console.log("nodes", graphInfo.nodes);
      setGraphInfo(graphInfo);
      setGraphLoadedState(true);
    }
  }, [loading, data]);

  return { data, loading, graphIsLoaded, graphInfo };
}
