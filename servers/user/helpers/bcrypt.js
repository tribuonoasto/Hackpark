const bcryptjs = require("bcryptjs");

const hash = (password) => bcryptjs.hashSync(password, 10);

const compare = (password, hashPassword) =>
  bcryptjs.compareSync(password, hashPassword);

module.exports = {
  hash,
  compare,
};
