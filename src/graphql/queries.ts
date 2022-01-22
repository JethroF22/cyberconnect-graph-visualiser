import gql from "graphql-tag";

export const following = gql`
  query identity($address: String!) {
    identity(address: $address) {
      address
      followingCount
      followerCount
      followers {
        list {
          address
        }
      }
      followings {
        list {
          address
        }
      }
    }
  }
`;
