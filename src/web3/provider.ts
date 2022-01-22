import * as ethers from "ethers";

const provider = new ethers.providers.AlchemyProvider(
  undefined,
  process.env.REACT_APP_ALCHEMY_URL
);

export default provider;
