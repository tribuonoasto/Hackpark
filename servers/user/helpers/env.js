const env = {
  host: process.env.nodemailerHost,
  port: process.env.nodemailerPort,
  user: process.env.email,
  pass: process.env.nodemailerpass,
  secret: process.env.secret,
  AbstractKey: process.env.AbstractKey,
};

module.exports = env;
