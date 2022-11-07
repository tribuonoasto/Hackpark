const env = {
  host: process.env.nodemailerHost,
  port: process.env.nodemailerPort,
  user: process.env.email,
  pass: process.env.nodemailerpass,
  secret: process.env.secret,
  AbstractKey: process.env.AbstractKey,
  serverKey: process.env.serverKey,
  clientKey: process.env.clientKey,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
};

module.exports = env;
