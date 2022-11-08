import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
      password
      fullName
      balance
      isRegis
      imgUrl
      role
      BalanceHistories {
        id
        UserId
        dateTransaction
        type
        amount
        status
      }
      Vehicle {
        id
        UserId
        plat
        modelName
        name
        imgUrl
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: ID) {
    getUserById(id: $getUserByIdId) {
      id
      username
      imgUrl
      email
      fullName
      balance
    }
  }
`;

export const GET_BALANCE = gql`
  query GetBalance($accessToken: String) {
    getBalance(access_token: $accessToken) {
      id
      UserId
      dateTransaction
      type
      amount
      status
    }
  }
`;

export const GET_VEHICLE = gql`
  query GetVehicle($accessToken: String) {
    getVehicle(access_token: $accessToken) {
      id
      UserId
      plat
      modelName
      name
      imgUrl
    }
  }
`;

export const LOGIN = gql`
  mutation Login($login: InputLogin) {
    login(login: $login) {
      access_token
      id
      username
      email
    }
  }
`;
