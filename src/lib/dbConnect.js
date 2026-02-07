const uri = process.env.MONGODB_URI;
const db = process.env.DB_NAME;

const { MongoClient, ServerApiVersion } = require("mongodb");
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
  } finally {
  }
}

run().catch(console.error);

export const usersColl = client.db(db).collection("users");
export const productsColl = client.db(db).collection("products");
export const cartsColl = client.db(db).collection("carts")
