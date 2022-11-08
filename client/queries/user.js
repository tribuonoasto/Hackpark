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

export const TOPUP_BALANCE = gql`
  mutation Payment($totalPrice: Int, $paymentStatus: String, $bank: String) {
    payment(
      totalPrice: $totalPrice
      paymentStatus: $paymentStatus
      bank: $bank
    ) {
      transaction_time
      gross_amount
      order_id
      payment_type
      status_code
      transaction_id
      transaction_status
      fraud_status
      status_message
      merchant_id
      va_numbers
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

export const REGISTER = gql`
  mutation Register($register: InputRegister) {
    register(register: $register) {
      message
    }
  }
`;
