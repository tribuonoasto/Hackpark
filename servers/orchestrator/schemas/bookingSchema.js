const axios = require("axios");
const errorHandling = require("../middlewares/errorHandling");
const baseUrlBooking = "http://localhost:4002";
const redis = require("./../config/redis");
const baseUrlUser = "http://localhost:3000";

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
    access_token: String
}

type Venue {
    _id: String
    name: String
    slot: Int
    address: String
    lat: Int
    lng: Int
    parkingPrice: Int
    bookingPrice: Int
    imgVenue: String
    description: String
}

type Slot {
    _id: String
    VenueId: String
    slot: Int
    floor: Int
    name: String
}

type Rating {
    _id: String
    UserId: Int
    VenueId: String
    rating: String
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
    booking(access_token:String,booking: InputBooking,id:ID): Data
}
`;

const resolvers = {
  Query: {
    getVenues: async () => {
      try {
        const itemsCache = await redis.get("app:venues");
        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/venues/`,
          });
          await redis.set("app:venues", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getVenueById: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/venues/${id}`,
        });
        await redis.del("app:venues");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    getSlots: async () => {
      try {
        const itemsCache = await redis.get("app:slots");
        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/slots/`,
          });
          await redis.set("app:slots", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getSlotById: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/slots/${id}`,
        });
        await redis.del("app:slots");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    getRatings: async () => {
      try {
        const itemsCache = await redis.get("app:ratings");
        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/ratings/`,
          });
          await redis.set("app:ratings", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getRatingById: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrlBooking}/ratings/${id}`,
        });
        await redis.del("app:ratings");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    getBookings: async () => {
      try {
        const itemsCache = await redis.get("app:bookings");
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
        const { UserId, SlotId, bookingDate, access_token } = booking;

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
          data: {
            SlotId,
            bookingDate,
            access_token,
            UserId,
          },
        });

        const { data: resp } = await axios({
          method: "patch",
          url: `${baseUrlUser}/users/changeBalancePayment`,
          headers: {
            access_token,
          },
          data: {
            price: book.price,
          },
        });
      } catch (error) {
        errorHandling(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
