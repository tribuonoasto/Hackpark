const env = {
  host: process.env.nodemailerHost,
  port: process.env.nodemailerPort,
  user: process.env.email,
  pass: process.env.nodemailerpass,
  secret: process.env.secret,
  AbstractKey: process.env.AbstractKey,
  serverKey: process.env.serverKey,
  clientKey: process.env.clientKey,
};

module.exports = env;
