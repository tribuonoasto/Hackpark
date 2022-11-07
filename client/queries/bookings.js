import { gql } from "@apollo/client";

export const GET_VENUES = gql`
  query GetVenues {
    getVenues {
      _id
      name
      slot
      address
      lat
      lng
      parkingPrice
      bookingPrice
      imgVenue
      description
    }
  }
`;

export const GET_VENUES_BY_ID = gql`
  query GetVenueById($getVenueByIdId: String) {
    getVenueById(id: $getVenueByIdId) {
      _id
      name
      slot
      address
      lat
      lng
      parkingPrice
      bookingPrice
      imgVenue
      description
    }
  }
`;

export const GET_SLOTS = gql`
  query GetSlots {
    getSlots {
      _id
      VenueId
      slot
      floor
      name
    }
  }
`;

export const GET_SLOTS_BY_ID = gql`
  query GetSlotById($getSlotByIdId: String) {
    getSlotById(id: $getSlotByIdId) {
      _id
      VenueId
      slot
      floor
      name
    }
  }
`;

export const GET_RATINGS = gql`
  query GetRatings {
    getRatings {
      _id
      UserId
      VenueId
      rating
    }
  }
`;

export const GET_RATINGS_BY_ID = gql`
  query GetRatingById($getRatingByIdId: String) {
    getRatingById(id: $getRatingByIdId) {
      _id
      UserId
      VenueId
      rating
    }
  }
`;

export const GET_BOOKINGS = gql`
  query GetBookings {
    getBookings {
      _id
      UserId
      SlotId
      bookingDate
      expiredDate
      checkinDate
      checkoutDate
      transactionStatus
      paymentStatus
      PriceAdjusterId
      totalPrice
      imgQrCode
    }
  }
`;

export const GET_BOOKINGS_BY_ID = gql`
  query GetBookingById($getBookingByIdId: String) {
    getBookingById(id: $getBookingByIdId) {
      _id
      UserId
      SlotId
      bookingDate
      expiredDate
      checkinDate
      checkoutDate
      transactionStatus
      paymentStatus
      PriceAdjusterId
      totalPrice
      imgQrCode
    }
  }
`;
