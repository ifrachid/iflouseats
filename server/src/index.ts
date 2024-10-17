import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/myRestaurantRoute";
import RestaurantRoute from "./routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import OrderRoute from "./routes/OrderRoute";
import ContactRoute from "./routes/ContactRoute";
mongoose
  .connect(process.env.MONGODB_CONNECTIOn_STRING as string)
  .then(() => console.log("connected to DB"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// const memoryStore = new session.MemoryStore();
// const keycloak = new Keycloak({ store: memoryStore });
const app = express();
// app.use(keycloak.middleware());
app.use(express.json());
app.use(cors());
app.listen(7000, () => {
  console.log("server started on localhost : 7000");
});
app.use("/api/orders", OrderRoute);
app.use("/api/my/user", myUserRoutes);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/my/contact", ContactRoute);
