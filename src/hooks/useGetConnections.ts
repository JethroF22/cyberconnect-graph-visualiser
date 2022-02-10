import { useEffect, useState, useContext } from "react";
import { useQuery } from "react-apollo";

import { following } from "../graphql/queries";
import { formatConnectionGraphInfo } from "../lib/graph";

import { AppContext } from "../context/AppContext";

import { Identity, IdentityType } from "../types/connections";
import { ConnectionGraphInfo, ConnectionNode, Node } from "../types/graph";
import { ActionTypes } from "../types/appContext";

export default function useGetConnections(address: string, rootNode: Node) {
  const { loading, data } = useQuery(following, {
    variables: {
      address,
    },
  });
  const { dispatch } = useContext(AppContext);
  const [graphIsLoaded, setGraphLoadedState] = useState(false);
  const [graphInfo, setGraphInfo] = useState<ConnectionGraphInfo>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    if (!loading && data) {
      const rootNodeWithIdentityData: ConnectionNode = {
        data: {
          ...rootNode.data,
          ...data.identity,
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
        rootNodeWithIdentityData
      );
      setGraphInfo(graphInfo);
      setGraphLoadedState(true);
      dispatch({
        type: ActionTypes.SET_FOLLOWED,
        value: followedAddresses,
      });
      dispatch({
        type: ActionTypes.SET_FOLLOWERS,
        value: followingAddresses,
      });
      dispatch({
        type: ActionTypes.SET_SEARCHED_IDENTITY,
        value: data.identity,
      });
    }
  }, [loading, data]);

  return { data, loading, graphIsLoaded, graphInfo };
}
