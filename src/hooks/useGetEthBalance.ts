import { useEffect, useState, useContext } from "react";

import { RequestState } from "../types/http";
import { ActionTypes } from "../types/appContext";

import { AppContext } from "../context/AppContext";
import { ethers } from "ethers";
import { convertToEth } from "../lib/transactions";

export default function useGetEthBalance() {
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );
  const {
    dispatch,
    state: { address },
  } = useContext(AppContext);

  useEffect(() => {
    if (address) {
      try {
        setRequestState(RequestState.LOADING);
        const getTransactions = async () => {
          const balanceUrl = `${process.env.REACT_APP_ETHERSCAN_BALANCE_URL}&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`;
          const response = await fetch(balanceUrl);
          const result = await response.json();
          console.log("balance", result);
          setRequestState(RequestState.RESOLVED);
          dispatch({
            type: ActionTypes.SET_ETH_BALANCE,
            value: convertToEth(result.result),
          });
        };
        getTransactions();
      } catch (error) {
        setRequestState(RequestState.REJECTED);
        console.log("error", error);
      }
    }
  }, [address]);

  return { requestState };
}
