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

export const VEHICLE = gql`
  mutation Vehicle($vehicle: InputVehicle) {
    vehicle(vehicle: $vehicle) {
      message
    }
  }
`;

export const ADD_RATING = gql`
  mutation Mutation($rating: InputRating) {
    rating(rating: $rating) {
      message
    }
  }
`;

export const RATINGS = gql`
  query GetRatings {
    getRatings {
      UserId
      VenueId
      _id
    }
  }
`;

export const RATING_BY_ID = gql`
  query GetRatingById($getRatingByIdId: String) {
    getRatingById(id: $getRatingByIdId) {
      rating
    }
  }
`;

export const GET_VEHICLE_BY_ID = gql`
  query GetUserById {
    getUserById {
      Vehicle {
        id
        imgUrl
        modelName
        name
        plat
      }
    }
  }
`;
