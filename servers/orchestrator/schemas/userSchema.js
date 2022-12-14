const axios = require("axios");
const errorHandling = require("../middlewares/errorHandling");
const baseUrlUser = "https://hackpark-service-user.herokuapp.com";
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
  UserId: Int
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

type MidtransResp {
  transaction_time: String
  gross_amount: String
  order_id: String
  payment_type: String
  status_code: String 
  transaction_id: String 
  transaction_status: String 
  fraud_status: String 
  status_message: String 
  merchant_id: String 
  va_numbers: String 
}

type Query {
    getUsers:[User]
    getUserById(id:ID):User
    getBalance:[BalanceHistories]
    getVehicle:[Vehicle]
    verify(id:ID): Data
}

type Mutation {
    login(login: InputLogin): Payload
    register(register: InputRegister): Data
    delete(access_token:String): Data
    changeUsername(access_token:String, username:String): Data
    changeBalance(price:Int): Data
    vehicle(vehicle: InputVehicle ): Data
    deleteVehicle(id:ID): Data
    payment(totalPrice:Int,paymentStatus:String,bank:String):MidtransResp
}
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const itemsCache = await redis.get("app:users");

        if (itemsCache) {
          return JSON.parse(itemsCache);
        } else {
          const { data } = await axios({
            method: "GET",
            url: `${baseUrlUser}/users/`,
          });
          await redis.set("app:users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        errorHandling(error);
      }
    },
    getUserById: async (_, args, context) => {
      try {
        const { id } = args;

        const { access_token } = context;

        const { data } = await axios({
          method: "GET",
          url: `${baseUrlUser}/users/${id}`,
          headers: {
            access_token,
          },
        });

        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    getBalance: async (_, args, context) => {
      try {
        const cache = await redis.get("app:users:balances");

        if (cache) return JSON.parse(cache);

        const { access_token } = context;

        const { data } = await axios({
          method: "GET",
          url: `${baseUrlUser}/balances`,
          headers: {
            access_token,
          },
        });
        await redis.set("app:users:balances", JSON.stringify(data));
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    getVehicle: async (_, args, context) => {
      try {
        const cache = await redis.get("app:users:vehicles");

        if (cache) return JSON.parse(cache);

        const { access_token } = context;

        const { data } = await axios({
          method: "GET",
          url: `${baseUrlUser}/vehicles`,
          headers: {
            access_token,
          },
        });
        await redis.set("app:users:vehicles", JSON.stringify(data));
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    verify: async (_, args) => {
      try {
        const { id } = args;

        const { data } = await axios({
          method: "get",
          url: `${baseUrlUser}/users/verify/${id}`,
        });
        return data;
      } catch (error) {
        errorHandling(error);
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
        return data;
      } catch (error) {
        errorHandling(error);
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

        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    delete: async (_, args, context) => {
      try {
        const { access_token } = context;

        const { data } = await axios({
          method: "DELETE",
          url: `${baseUrlUser}/users/`,
          headers: {
            access_token,
          },
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    changeUsername: async (_, args, context) => {
      try {
        const { username } = args;

        const { access_token } = context;

        const params = new URLSearchParams();
        params.append("username", username);

        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrlUser}/users/changeusername`,
          headers: {
            access_token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: params,
        });
        await redis.del("app:users");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    changeBalance: async (_, args, context) => {
      try {
        const { price } = args;

        const { access_token } = context;

        const params = new URLSearchParams();
        params.append("price", price);

        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrlUser}/users/changeBalancePayment`,
          headers: {
            access_token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: params,
        });
        await redis.del("app:users:balances");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    vehicle: async (_, args, context) => {
      try {
        const { vehicle } = args;

        const { access_token } = context;

        const { data } = await axios({
          method: "POST",
          url: `${baseUrlUser}/vehicles`,
          headers: {
            access_token,
          },
          data: vehicle,
        });
        await redis.del("app:users:vehicles");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    deleteVehicle: async (_, args, context) => {
      try {
        const { id } = args;

        const { access_token } = context;

        const { data } = await axios({
          method: "DELETE",
          url: `${baseUrlUser}/vehicles/${id}`,
          headers: {
            access_token,
          },
        });
        await redis.del("app:users:vehicles");
        return data;
      } catch (error) {
        errorHandling(error);
      }
    },
    payment: async (_, args, context) => {
      try {
        const { totalPrice, paymentStatus, bank } = args;

        const { access_token } = context;

        const { data } = await axios({
          method: "post",
          url: `${baseUrlUser}/balances/payment`,
          headers: {
            access_token,
          },
          data: {
            totalPrice,
            paymentStatus,
            bank,
          },
        });

        await redis.del("app:users");

        await redis.del("app:bookings:balances");

        return data;
      } catch (err) {
        errorHandling(err);
      }
    },
  },
};
module.exports = { typeDefs, resolvers };
