import { gql } from "@apollo/client";

export const GET_VENUES = gql`
  query GetVenues {
    getVenues {
      _id
      address
      bookingPrice
      description
      imgVenue
      lat
      lng
      name
      parkingPrice
    }
  }
`;

export const GET_VENUES_BY_ID = gql`
  query GetVenueById($getVenueByIdId: String) {
    getVenueById(id: $getVenueByIdId) {
      Slots {
        _id
        floor
        name
        slot
      }
      _id
      address
      bookingPrice
      description
      imgVenue
      name
      parkingPrice
    }
  }
`;

export const GET_SLOTS = gql`
  query GetSlots {
    getSlots {
      VenueId
      _id
      floor
      name
      slot
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

export const GET_VENUE_BY_SLOT_ID = gql`
  query GetSlotById($getSlotByIdId: String) {
    getSlotById(id: $getSlotByIdId) {
      Venue {
        _id
        imgVenue
        name
      }
    }
  }
`;

export const BOOKINGS = gql`
  mutation Mutation($booking: InputBooking!) {
    booking(booking: $booking) {
      message
      bookingId
    }
  }
`;
