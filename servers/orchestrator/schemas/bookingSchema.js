const axios = require("axios");
const baseUrlBooking = "http://localhost:4002";
const redis = require("./../config/redis");

const typeDefs = `#graphql

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

type Query {
    getVenues:[Venue]
    getVenueById(id:String): Venue
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
  },
  Mutation: {},
};

module.exports = { typeDefs, resolvers };
