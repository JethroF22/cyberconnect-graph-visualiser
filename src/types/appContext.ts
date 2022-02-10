import { Dispatch } from "react";
import { Identity } from "./connections";
import { Transaction } from "./etherscan";

export enum ActionTypes {
  SET_ADDRESS = "SET_ADDRESS",
  SET_ETH_BALANCE = "SET_ETH_BALANCE",
  SET_FOLLOWERS = "SET_FOLLOWERS",
  SET_FOLLOWED = "SET_FOLLOWED",
  SET_SEARCHED_IDENTITY = "SET_SEARCHED_IDENTITY",
  SET_TRANSACTIONS = "SET_TRANSACTIONS",
  SET_ERC20_TRANSFERS = "SET_ERC20_TRANSFERS",
  SET_ERC721_TRANSFERS = "SET_ERC721_TRANSFERS",
}

export interface SetEthBalanceAction {
  type: ActionTypes.SET_ETH_BALANCE;
  value: string;
}

export interface SetAddressAction {
  type: ActionTypes.SET_ADDRESS;
  value: string;
}

export interface SetFollowersAction {
  type: ActionTypes.SET_FOLLOWERS;
  value: Identity[];
}

export interface SetFollowedAction {
  type: ActionTypes.SET_FOLLOWED;
  value: Identity[];
}

export interface SetTransactionsAction {
  type: ActionTypes.SET_TRANSACTIONS;
  value: Transaction[];
}

export interface SetErc20TransfersAction {
  type: ActionTypes.SET_ERC20_TRANSFERS;
  value: Transaction[];
}

export interface SetErc721TransfersAction {
  type: ActionTypes.SET_ERC721_TRANSFERS;
  value: Transaction[];
}

export interface SetSearchedIdentityAction {
  type: ActionTypes.SET_SEARCHED_IDENTITY;
  value: Identity;
}

export type ReducerAction =
  | SetAddressAction
  | SetEthBalanceAction
  | SetFollowersAction
  | SetFollowedAction
  | SetTransactionsAction
  | SetErc20TransfersAction
  | SetErc721TransfersAction
  | SetSearchedIdentityAction;

export interface AppContextState {
  address: string | null;
  ethBalance: string | null;
  searchedIdentity: Identity | null;
  transactions: Transaction[] | null;
  erc20Transfers: Transaction[] | null;
  erc721Transfers: Transaction[] | null;
  followers: Identity[] | null;
  followed: Identity[] | null;
}

export interface AppContextValue {
  state: AppContextState;
  dispatch: Dispatch<ReducerAction>;
}
