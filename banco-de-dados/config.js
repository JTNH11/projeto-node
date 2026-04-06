const { MongoClient } = require("mongodb");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
let client;
let clientPromise;
const uri = process.env.MONGODB_URI;

const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor, defina a variável MONGODB_URI no ambiente.");
}

if (!client) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

module.exports = clientPromise;
