const axios = require("axios");
const baseUrlUser = "http://localhost:3000";
const redis = require("./../config/redis");

const typeDefs = `#graphql

input InputRegister{
    username: String
    email: String
    password: String
    fullName: String
}

input InputLogin {
    email: String
    password: String
}

input InputVehicle{
  plat: String
  modelName: String
  name: String
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

type Data {
  message: String
}

type Query {
    getUsers:[User]
    getUserById(id:ID, access_token:String):User
    getBalance(access_token:String):[BalanceHistories]
    getVehicle(access_token:String):[Vehicle]
}

type Mutation {
    login(login: InputLogin): Payload
    register(register: InputRegister): Data
    verify(id:ID): Data
    delete(access_token:String): Data
    changeUsername(access_token:String, username:String): Data
    changeBalance(access_token:String, price:Int): Data
    vehicle(access_token:String, vehicle: InputVehicle ): Data
    deleteVehicle(access_token:String, id:ID): Data
}
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const itemsCache = await redis.get("app:users");
        if (itemsCache) {
          console.log("data dari cache");
          return JSON.parse(itemsCache);
        } else {
          console.log("data dari service");
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlUser}/users/`,
          });
          await redis.set("app:users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (_, args) => {
      try {
        const { id, access_token } = args;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrlUser}/users/${id}`,
          headers: {
            access_token: `${access_token}`,
          },
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getBalance: async (_, args) => {
      try {
        const { access_token } = args;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrlUser}/balances`,
          headers: {
            access_token: `${access_token}`,
          },
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getVehicle: async (_, args) => {
      try {
        const { access_token } = args;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrlUser}/vehicles`,
          headers: {
            access_token: `${access_token}`,
          },
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const { register } = args;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrlUser}/register`,
          data: register,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, args) => {
      try {
        const { login } = args;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrlUser}/login`,
          data: login,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    verify: async (_, args) => {
      try {
        const { id } = args;
        const {data} = await axios({
          method: "PATCH",
          url: `${baseUrlUser}/users/verify/${id}`,
        });
        await redis.del("app:users");
        return data
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (_, args) => {
      try {
        const { access_token } = args;
        const {data} = await axios({
          method: "DELETE",
          url: `${baseUrlUser}/users/`,
          headers: {
            access_token: `${access_token}`,
          },
        });
        await redis.del("app:users");
        return data
      } catch (error) {
        console.log(error);
      }
    },
    changeUsername: async (_, args) => {
      try {
        const { access_token, username } = args;

        const params = new URLSearchParams();
        params.append("username", username);

        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrlUser}/users/changeusername`,
          headers: {
            access_token: `${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: params,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    changeBalance: async (_, args) => {
      try {
        const { access_token, price } = args;

        const params = new URLSearchParams();
        params.append("price", price);

        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrlUser}/users/changeBalancePayment`,
          headers: {
            access_token: `${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: params,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    vehicle: async (_, args) => {
      try {
        const { access_token, vehicle } = args;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrlUser}/vehicles`,
          headers: {
            access_token: `${access_token}`,
          },
          data: vehicle,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteVehicle: async (_, args) => {
      try {
        const { access_token , id} = args;
        const {data} = await axios({
          method: "DELETE",
          url: `${baseUrlUser}/vehicles/${id}`,
          headers: {
            access_token: `${access_token}`,
          },
        });
        await redis.del("app:users");
        return data
      } catch (error) {
        console.log(error);
      }
    },
  },
};
module.exports = { typeDefs, resolvers };
