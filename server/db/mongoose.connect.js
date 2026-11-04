import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017";
const MONGO_DB_NAME = "sportz";

export const mongooseConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
    });

    if (!mongoose.connection.db)
      throw new Error("Mongo Database connection is not available");

    await mongoose.connection.db.command({ ping: 1 });
    console.log("Mongo Database connected");
  } catch (err) {
    console.error("Mongo Database connection failed:", err);
    throw err;
  }
};

export const mongooseDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Mongo Database disconnected");
  } catch (err) {
    console.error("Mongo Database disconnection failed:", err);
    throw err;
  }
};
