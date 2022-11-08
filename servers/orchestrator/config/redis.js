const Redis = require("ioredis");

const redis = new Redis({
  port: 14691, // Redis port
  host: "redis-14691.c84.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default",
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

module.exports = redis;
