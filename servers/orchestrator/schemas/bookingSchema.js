const axios = require("axios");
const baseUrlUser = "http://localhost:4002";
// const redis = require('./../config/redis');

const typeDefs = `#graphql

`

const resolvers = {
    Query: {},
    Mutation: {}
}

module.exports = { typeDefs, resolvers };