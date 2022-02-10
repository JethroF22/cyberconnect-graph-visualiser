import { Dispatch } from "react";
import { Identity } from "./connections";
import { Transaction } from "./etherscan";

export enum ActionTypes {
  SET_ADDRESS = "SET_ADDRESS",
  SET_FOLLOWERS = "SET_FOLLOWERS",
  SET_FOLLOWED = "SET_FOLLOWED",
  SET_SEARCHED_IDENTITY = "SET_SEARCHED_IDENTITY",
  SET_TRANSACTIONS = "SET_TRANSACTIONS",
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

export interface SetSearchedIdentityAction {
  type: ActionTypes.SET_SEARCHED_IDENTITY;
  value: Identity;
}

export type ReducerAction =
  | SetAddressAction
  | SetFollowersAction
  | SetFollowedAction
  | SetTransactionsAction
  | SetSearchedIdentityAction;

export interface AppContextState {
  address: string | null;
  searchedIdentity: Identity | null;
  transactions: Transaction[] | null;
  followers: Identity[] | null;
  followed: Identity[] | null;
}

export interface AppContextValue {
  state: AppContextState;
  dispatch: Dispatch<ReducerAction>;
}
