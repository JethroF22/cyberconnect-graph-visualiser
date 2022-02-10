import { createContext } from "react";

import {
  ActionTypes,
  AppContextState,
  AppContextValue,
  ReducerAction,
} from "../types/appContext";
import { Identity } from "../types/connections";
import { Transaction } from "../types/etherscan";

export const AppContext = createContext<AppContextValue>({
  state: {} as AppContextState,
  dispatch: () => null,
});

export const initialState = {
  address: "",
  searchedIdentity: null,
  transactions: null,
  erc20Transfers: null,
  erc721Transfers: null,
  followers: null,
  followed: null,
  ethBalance: null,
};

export const appContextReducer = (
  state: AppContextState,
  action: ReducerAction
): AppContextState => {
  switch (action.type) {
    case ActionTypes.SET_SEARCHED_IDENTITY:
      return {
        ...state,
        searchedIdentity: action.value as Identity,
      };
    case ActionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.value as string,
      };
    case ActionTypes.SET_ETH_BALANCE:
      return {
        ...state,
        ethBalance: action.value as string,
      };
    case ActionTypes.SET_ERC20_TRANSFERS:
      return {
        ...state,
        erc20Transfers: action.value as Transaction[],
      };
    case ActionTypes.SET_ERC721_TRANSFERS:
      return {
        ...state,
        erc721Transfers: action.value as Transaction[],
      };
    case ActionTypes.SET_FOLLOWED:
      return {
        ...state,
        followed: action.value as Identity[],
      };
    case ActionTypes.SET_FOLLOWERS:
      return {
        ...state,
        followers: action.value as Identity[],
      };
    case ActionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.value as Transaction[],
      };
    default:
      return state;
  }
};
