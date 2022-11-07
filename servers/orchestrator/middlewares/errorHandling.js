const { GraphQLError } = require("graphql");

const errorHandling = (err) => {
  if (err.response)
    return new GraphQLError(err.response.data.message, {
      extensions: {
        code: err.response.status,
      },
    });
  return err;
};

module.exports = errorHandling;
