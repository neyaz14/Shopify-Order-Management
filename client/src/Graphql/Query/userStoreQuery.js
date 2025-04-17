import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query getUsers{
       
        users{
            displayName
            email
            storeIDs {
                        id
                    }
            }
        
    }
`

export const GET_USERS_ID = gql`
    query getUsers{
       
        users{
            id
            email
        }
    }
`













export const GET_STORES_FULL_DATA = gql`
    query getStoresFullData{
       
            
                stores{
                    storeName
                    storeUrl
                    accessToken
                    apiVersion
                    permissions
                    user {
                            id
                            email
                            displayName
                        } 
                    }
            
        
    }
`

// ! ------------------------ single data api call 

// Get single user by ID
export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    user(id: $id) {
      id
      displayName
      email
      storeIDs {
        id
      }
    }
  }
`;

// Get single user by email
export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      displayName
      email
      storeIDs {
        id
        
      }
    }
  }
`;

// Get single store by ID
export const GET_STORE_BY_ID = gql`
  query getStoreById($id: ID!) {
    store(id: $id) {
      id
      storeName
      storeUrl
      accessToken
      apiVersion
      permissions
      user {
        id
        displayName
        email
      }
    }
  }
`;
