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
  const [graphInfo, setGraphInfo] = useState<GraphInfo>();

  useEffect(() => {
    if (!loading && data) {
      const rootNode: Node = {
        id: 0,
        label: `${data.identity.address} (${data.identity.ens})`,
        title: data.identity.address,
        shape: "circularImage",
        image:
          data.identity.avatar ||
          "http://cdn.onlinewebfonts.com/svg/img_258083.png",
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
      setGraphInfo(graphInfo);
    }
  }, [loading, data]);

  return { graphInfo, data, loading };
}
