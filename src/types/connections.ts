export interface Identity {
  address: string;
  domain: string;
  ens: string;
  social: string;
  avatar: string;
  joinTime: string;
  followingCount: number;
  followerCount: number;
  type?: IdentityType;
}

export enum IdentityType {
  FOLLOWING = "FOLLOWING",
  FOLLOWED = "FOLLOWED",
}
