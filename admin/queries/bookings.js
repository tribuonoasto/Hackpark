import { gql } from "@apollo/client";

export const GET_BOOKINGS_BY_ID = gql`
  query GetBookingById($id: String) {
    getBookingById(id: $id) {
      _id
      bookingDate
      checkinDate
      checkoutDate
      transactionStatus
      User {
        username
      }
      Slot {
        VenueId
        slot
        floor
        name
      }
      Venue {
        address
        bookingPrice
        name
        parkingPrice
        imgVenue
      }
    }
  }
`;
