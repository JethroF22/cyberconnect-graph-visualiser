import gql from "graphql-tag";

export const following = gql`
  query identity($address: String!) {
    identity(address: $address) {
      address
      domain
      ens
      social {
        twitter
      }
      avatar
      joinTime
      followingCount
      followerCount
      followers {
        list {
          address
          domain
          ens
          avatar
        }
      }
      followings {
        list {
          address
          domain
          ens
          avatar
        }
      }
    }
  }
`;
