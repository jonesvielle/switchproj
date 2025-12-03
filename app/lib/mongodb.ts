import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please define MONGODB_URI in your .env.local file.\nExample:\nMONGODB_URI=mongodb+srv://user:pass@ac-rf743x8.aequtvn.mongodb.net/quickteller"
  );
}

const sanitizedUri = uri.replace(/:\/\/.*@/, "://***:***@");
console.log("Attempting to connect to MongoDB Atlas:", sanitizedUri);

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client
      .connect()
      .then((connectedClient) => {
        console.log("MongoDB connected successfully (Dev mode)");
        return connectedClient;
      })
      .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client
    .connect()
    .then((connectedClient) => {
      console.log("MongoDB connected successfully (Production mode)");
      return connectedClient;
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      throw err;
    });
}

export default clientPromise;
