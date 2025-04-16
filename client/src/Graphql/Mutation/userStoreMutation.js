import { gql } from '@apollo/client';

// export const Delete_USER = gql`
//     mutation deleteClient($id: ID!){
//         deleteClient(id: $id){
//             id
//             name
//             email
//             phone
//         }
//     }
// `
export const ADD_STORE = gql`
  mutation addStore(
    $storeName: String!,
    $storeUrl: String!,
    $accessToken: String!,
    $apiVersion: String!,
    $permissions: String!,
    $user: ID!
  ) {
    addStore(
      storeName: $storeName,
      storeUrl: $storeUrl,
      accessToken: $accessToken,
      apiVersion: $apiVersion,
      permissions: $permissions,
      user: $user
    ) {
      id
      storeName
      storeUrl
      accessToken
      apiVersion
      permissions
      user {
        id
        displayName
      }
    }
  }
`;


/**
 * ✅ কিভাবে কল করবে (React Example)

const [addStore] = useMutation(ADD_STORE);

addStore({
  variables: {
    storeName: "My Shopify Store",
    storeUrl: "https://myshop.myshopify.com",
    accessToken: "shpat_abc123xyz456",
    apiVersion: "2024-01",
    permissions: "write",
    user: "661d69e07f993f5d1df6c123" // বাস্তব User ID
  }
});
*/