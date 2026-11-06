import mongoose from "mongoose";
import { env, isDemo } from "./env";
declare global {
  var rwmMongo: Promise<typeof mongoose> | undefined;
}
export async function connectDB() {
  if (isDemo || !env.MONGODB_URI) throw new Error("LIVE_SERVICE_UNAVAILABLE");
  if (!global.rwmMongo)
    global.rwmMongo = mongoose
      .connect(env.MONGODB_URI, {
        dbName: env.MONGODB_DB,
        serverSelectionTimeoutMS: 5000,
      })
      .catch((e) => {
        global.rwmMongo = undefined;
        throw e;
      });
  return global.rwmMongo;
}
