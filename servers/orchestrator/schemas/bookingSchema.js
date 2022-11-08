const axios = require("axios");
const errorHandling = require("../middlewares/errorHandling");
const baseUrlBooking = "http://localhost:4002";
const baseUrlUser = "http://localhost:3000";
const redis = require("./../config/redis");

const typeDefs = `#graphql

input InputRating {
    UserId: Int
    VenueId: String
    rating: String
}

input InputBooking {
    UserId: Int
    SlotId: String
    bookingDate: String
}

input InputBookingId {
  bookingId: String
}

type Venue {
    _id: String
    name: String
    address: String
    lat: String
    lng: String
    parkingPrice: Int
    bookingPrice: Int
    imgVenue: String
    description: String
    Ratings: [Rating]
    Slots: [Slot]
}

type Slot {
    _id: String
    VenueId: String
    slot: Int
    floor: Int
    name: String
    Venue: Venue
    Bookings: [Booking]
}

type Rating {
    _id: String
    UserId: Int
    VenueId: String
    rating: Int
    User: User
    Venue: Venue
}

type Booking {
  _id: String
  UserId: Int
  SlotId: String
  bookingDate: String
  expiredDate: String
  checkinDate: String
  checkoutDate: String
  transactionStatus: String
  paymentStatus: String
  PriceAdjusterId: Int
  totalPrice: Int
  imgQrCode: String
}

type Data {
  message: String
}

type bookingData {
  message: String
  bookingId: String
}

type Payload {
    access_token: String
    id: ID
    username: String
    email: String
}

type User {
    id:ID
    username: String
    email: String
    password: String
    fullName: String
    balance: Int
    isRegis: Boolean
    imgUrl: String
    role: String
    BalanceHistories: [BalanceHistories]
    Vehicle: Vehicle
}

type BalanceHistories {
    id: ID
    UserId: ID
    dateTransaction: String
    type: String
    amount: Int
    status: String
}

type Vehicle{
    id: ID
    UserId: ID
    plat: String
    modelName: String
    name: String
    imgUrl: String
}

type Query {
    getVenues:[Venue]
    getVenueById(id:String): Venue
    getSlots:[Slot]
    getSlotById(id:String): Slot
    getRatings:[Rating]
    getRatingById(id:String): Rating
    getBookings:[Booking]
    getBookingById(id:String):Booking
}

type Mutation {
    rating(rating: InputRating): Data
    booking(booking: InputBooking!): bookingData
    checkBooking(bookingId: InputBookingId):Data
}
`;

const resolvers = {
  Query: {
    getVenues: async () => {
      try {
        // const itemsCache = await redis.get("app:venues");
        const itemsCache = null;
        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data: venues } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/venues`,
          });

          const { data: slots } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/slots`,
          });

          const { data: ratings } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/ratings`,
          });

          const slotVenues = venues.map((venue) => {
            let slot = slots.filter((slot) => {
              if (slot.VenueId === venue._id) {
                return slot;
              }
            });
            if (slot.length === 0) {
              return {
                ...venue,
                Slots: [],
              };
            } else {
              return {
                ...venue,
                Slots: slot,
              };
            }
          });

          const newVenues = slotVenues.map((venue) => {
            let newRatings = ratings.filter((rating) => {
              if (rating.VenueId === venue._id) {
                return rating;
              }
            });
            if (newRatings.length === 0) {
              return {
                ...venue,
                Ratings: [],
              };
            } else {
              return {
                ...venue,
                Ratings: newRatings,
              };
            }
          });

          await redis.set("app:venues", JSON.stringify(newVenues));

          return newVenues;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getVenueById: async (_, args, context) => {
      try {
        const { id } = args;
        const { data: venue } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/venues/${id}`,
        });

        const { data: slots } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/slots`,
        });

        const { data: ratings } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/ratings`,
        });

        const venues = [venue];

        const slotVenues = venues.map((venue) => {
          let slot = slots.filter((slot) => {
            if (slot.VenueId === venue._id) {
              return slot;
            }
          });
          if (slot.length === 0) {
            return {
              ...venue,
              Slots: [],
            };
          } else {
            return {
              ...venue,
              Slots: slot,
            };
          }
        });

        const newVenues = slotVenues.map((venue) => {
          let newRatings = ratings.filter((rating) => {
            if (rating.VenueId === venue._id) {
              return rating;
            }
          });
          if (newRatings.length === 0) {
            return {
              ...venue,
              Ratings: [],
            };
          } else {
            return {
              ...venue,
              Ratings: newRatings,
            };
          }
        });

        const newVenue = newVenues[0];

        await redis.del("app:venues");
        return newVenue;
      } catch (error) {
        errorHandling(error);
      }
    },
    getSlots: async () => {
      try {
        // const itemsCache = await redis.get("app:slots");
        const itemsCache = null;
        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data: slots } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/slots`,
          });

          const { data: venues } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/venues`,
          });

          const { data: bookings } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/bookings`,
          });

          const venueSlots = slots.map((slot) => {
            let venue = venues.filter((venue) => {
              if (slot.VenueId === venue._id) {
                return venue;
              }
            });
            if (venue.length === 0) {
              return {
                ...slot,
                Venue: {},
              };
            } else {
              return {
                ...slot,
                Venue: venue[0],
              };
            }
          });

          const newSlots = venueSlots.map((slot) => {
            let booking = bookings.filter((booking) => {
              if (booking.SlotId === slot._id) {
                return booking;
              }
            });
            if (booking.length === 0) {
              return {
                ...slot,
                Bookings: [],
              };
            } else {
              return {
                ...slot,
                Bookings: booking,
              };
            }
          });

          await redis.set("app:slots", JSON.stringify(newSlots));
          return newSlots;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getSlotById: async (_, args) => {
      try {
        const { id } = args;
        const { data: slot } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/slots/${id}`,
        });

        const slots = [slot];

        const { data: venues } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/venues`,
        });

        const { data: bookings } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/bookings`,
        });

        const venueSlots = slots.map((slot) => {
          let venue = venues.filter((venue) => {
            if (slot.VenueId === venue._id) {
              return venue;
            }
          });
          if (venue.length === 0) {
            return {
              ...slot,
              Venue: {},
            };
          } else {
            return {
              ...slot,
              Venue: venue[0],
            };
          }
        });

        const newSlots = venueSlots.map((slot) => {
          let booking = bookings.filter((booking) => {
            if (booking.SlotId === slot._id) {
              return booking;
            }
          });
          if (booking.length === 0) {
            return {
              ...slot,
              Bookings: [],
            };
          } else {
            return {
              ...slot,
              Bookings: booking,
            };
          }
        });

        const newSlot = newSlots[0];

        await redis.del("app:slots");
        return newSlot;
      } catch (error) {
        errorHandling(error);
      }
    },
    getRatings: async () => {
      try {
        // const itemsCache = await redis.get("app:ratings");
        const itemsCache = null;
        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data: ratings } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/ratings`,
          });

          const { data: venues } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/venues`,
          });

          const { data: users } = await axios({
            method: "GET",
            url: `${baseUrlUser}/users/`,
          });

          const ratingVenue = ratings.map((rating) => {
            let venue = venues.filter((venue) => {
              if (rating.VenueId === venue._id) {
                return venue;
              }
            });
            if (venue.length === 0) {
              return {
                ...rating,
                Venue: {},
              };
            } else {
              return {
                ...rating,
                Venue: venue[0],
              };
            }
          });

          const newRatings = ratingVenue.map((rating) => {
            let user = users.filter((user) => {
              if (rating.UserId === user.id) {
                return user;
              }
            });
            if (user.length === 0) {
              return {
                ...rating,
                User: {},
              };
            } else {
              return {
                ...rating,
                User: user[0],
              };
            }
          });

          await redis.set("app:ratings", JSON.stringify(newRatings));
          return newRatings;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getRatingById: async (_, args) => {
      try {
        const { id } = args;
        const { data: rating } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/ratings/${id}`,
        });

        const { data: venues } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/venues`,
        });

        const { data: users } = await axios({
          method: "GET",
          url: `${baseUrlUser}/users/`,
        });

        const ratings = [rating];

        const ratingVenue = ratings.map((rating) => {
          let venue = venues.filter((venue) => {
            if (rating.VenueId === venue._id) {
              return venue;
            }
          });
          if (venue.length === 0) {
            return {
              ...rating,
              Venue: {},
            };
          } else {
            return {
              ...rating,
              Venue: venue[0],
            };
          }
        });

        const newRatings = ratingVenue.map((rating) => {
          let user = users.filter((user) => {
            if (rating.UserId === user.id) {
              return user;
            }
          });
          if (user.length === 0) {
            return {
              ...rating,
              User: {},
            };
          } else {
            return {
              ...rating,
              User: user[0],
            };
          }
        });

        const newRating = newRatings[0];

        await redis.del("app:ratings");
        return newRating;
      } catch (error) {
        errorHandling(error);
      }
    },
    getBookings: async () => {
      try {
        // const itemsCache = await redis.get("app:bookings");
        const itemsCache = null;
        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/bookings/`,
          });
          await redis.set("app:bookings", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getBookingById: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/bookings/${id}`,
        });
        await redis.del("app:bookings");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
  },
  Mutation: {
    rating: async (_, args) => {
      try {
        const { rating } = args;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrlBooking}/ratings`,
          data: rating,
        });
        await redis.del("app:ratings");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    booking: async (_, args) => {
      try {
        const { booking } = args;
        const { access_token } = context;
        const { UserId, SlotId, bookingDate } = booking;

        const { data: user } = await axios({
          method: "get",
          url: `${baseUrlUser}/users/${UserId}`,
          headers: {
            access_token,
          },
        });

        if (!user) throw { name: "user_not_found" };

        const { data: book } = await axios({
          method: "POST",
          url: `${baseUrlBooking}/bookings`,
          data: booking,
        });
        await redis.del("app:bookings");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    checkBooking: async (_, args, context) => {
      try {
        const { bookingId } = args;
        const { access_token } = context;

        const { data: book } = await axios({
          method: "post",
          url: `${baseUrlBooking}/bookings/check/${bookingId.bookingId}`,
        });

        if (book == "Checkout Success") {
          await axios({
            method: "patch",
            url: `${baseUrlUser}/users/changeBalancePayment`,
            headers: {
              access_token,
            },
            data: {
              price: book.checkoutPrice,
            },
          });
          return book;
        }

        return book;
      } catch (err) {
        errorHandling(err);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
