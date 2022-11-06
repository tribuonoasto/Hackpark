const axios = require("axios");
const baseUrlBooking = "http://localhost:4002";
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

type Data {
  message: String
}

type Query {
    getVenues:[Venue]
    getVenueById(id:String): Venue
    getSlots:[Slot]
    getSlotById(id:String): Slot
    getRatings:[Rating]
    getRatingById(id:String): Rating
}

type Mutation {
    rating(rating: InputRating): Data
    booking(booking: InputBooking): Data
}
`;

const resolvers = {
  Query: {
    getVenues: async () => {
      try {
        const itemsCache = await redis.get("app:venues");
        if (itemsCache) {
          console.log("data dari cache");
          return JSON.parse(itemsCache);
        } else {
          console.log("data dari service");
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/venues/`,
          });
          await redis.set("app:venues", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    },
    getSlots: async () => {
      try {
        const itemsCache = await redis.get("app:slots");
        if (itemsCache) {
          console.log("data dari cache");
          return JSON.parse(itemsCache);
        } else {
          console.log("data dari service");
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/slots/`,
          });
          await redis.set("app:slots", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    },
    getRatings: async () => {
      try {
        const itemsCache = await redis.get("app:ratings");
        if (itemsCache) {
          console.log("data dari cache");
          return JSON.parse(itemsCache);
        } else {
          console.log("data dari service");
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlBooking}/ratings/`,
          });
          await redis.set("app:ratings", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
      }
    },
    booking: async (_, args) => {
      try {
        const { booking } = args;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrlBooking}/bookings`,
          data: booking,
        });
        await redis.del("app:bookings");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
