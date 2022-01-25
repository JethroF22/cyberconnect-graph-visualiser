import { useEffect, useState } from "react";
import { useQuery } from "react-apollo";

import { following } from "../graphql/queries";
import { formatConnectionGraphInfo } from "../lib/graph";
import { Identity, IdentityType } from "../types/connections";
import { ConnectionGraphInfo, ConnectionNode } from "../types/graph";

export default function useGetConnections(address: string) {
  const { loading, data } = useQuery(following, {
    variables: {
      address: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E",
    },
  });
  const [graphIsLoaded, setGraphLoadedState] = useState(false);
  const [graphInfo, setGraphInfo] = useState<ConnectionGraphInfo>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    if (!loading && data) {
      const rootNode: ConnectionNode = {
        data: {
          id: 0,
          label: `${data.identity.address} (${data.identity.ens})`,
          color: "#C6C7C4",
          ...data.identity,
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
      const graphInfo = formatConnectionGraphInfo(
        [...followedAddresses, ...followingAddresses],
        rootNode
      );
      setGraphInfo(graphInfo);
      setGraphLoadedState(true);
    }
  }, [loading, data]);

  return { data, loading, graphIsLoaded, graphInfo };
}
