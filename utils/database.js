import mongoose from "mongoose";

// track the connection
let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "prompt_db",
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    isConnected = true
    console.log("Mongo DB Connected")
  } catch (error) {
    console.log(error)
  }

}
