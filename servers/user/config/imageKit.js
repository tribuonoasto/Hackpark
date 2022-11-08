const ImageKit = require("imagekit");
const env = require("../helpers/env");

const imagekit = new ImageKit({
  publicKey: env.publicKey,
  privateKey: env.privateKey,
  urlEndpoint: env.urlEndpoint,
});

module.exports = imagekit;
