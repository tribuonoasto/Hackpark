if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const bookingSchema = require("./schemas/bookingSchema");
const userSchema = require("./schemas/userSchema");
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: [userSchema.typeDefs, bookingSchema.typeDefs],
  resolvers: [userSchema.resolvers, bookingSchema.resolvers],
  introspection: true,
  playground: true,
});

startStandaloneServer(server, {
  listen: { port: PORT },
  context: ({ req, res }) => {
    console.log(req.headers);
    return { access_token: req.headers.access_token };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
