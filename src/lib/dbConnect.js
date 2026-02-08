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

const collections = (collectionName) => {
  const collection = client.db(db).collection(collectionName);
  return collection;
};

export const usersColl = collections("users");
export const productsColl = collections("products");
export const cartsColl = collections("carts");
export const ordersColl = collections("orders");
