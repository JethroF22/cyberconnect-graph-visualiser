import { useQuery } from "react-apollo";
import { following } from "./graphql/queries";

function App() {
  const { loading, data } = useQuery(following, {
    variables: {
      address: "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E",
    },
  });
  console.log("data", data);

  return (
    <>
      {loading && "Loading..."}
      {!loading && <div>Hello World</div>}
    </>
  );
}

export default App;
