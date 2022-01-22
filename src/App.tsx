import Graph from "react-graph-vis";

import useGetConnections from "./hooks/useGetConnections";
import { options } from "./lib/graph";

function App() {
  const { graphInfo, data, loading } = useGetConnections(
    "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E"
  );

  return (
    <>
      {loading && "Loading..."}
      {!loading && graphInfo && <Graph graph={graphInfo} options={options} />}
    </>
  );
}

export default App;
