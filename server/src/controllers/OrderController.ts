import { Request, Response } from "express";
import Order from "../models/order";
import mongoose from "mongoose";
import Restaurant from "../models/restaurant";

const createOrder = async (req: Request, res: Response) => {
  try {
    const user = new mongoose.Types.ObjectId(req.body.userId);
    const restaurant = new mongoose.Types.ObjectId(req.body.restaurantId);

    const newOrder = new Order({
      restaurant: restaurant,
      user: user,
      status: req.body.status,
      deliveryDetails: req.body.deliveryDetails,
      cartItems: req.body.cartItems,
      total: req.body.total,
      createAt: new Date(),
    });
    await newOrder.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("restaurant")
      .populate("user");
    if (!order) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went Wrong" });
  }
};

const getOrderByUser = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    const orders = await Order.find({
      user: authorization,
    })
      .populate("restaurant")
      .populate("user")
      .sort({ $natural: 1 });

    if (!orders) {
      return res.status(404).json({ messsage: "Orders not found" });
    }
    return res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const getOrderByRestaurant = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({
      restaurant: req.params.restaurantId,
    })
      .populate("restaurant")
      .populate("user");

    if (!orders) {
      return res.status(404).json({ messsage: "Orders not found" });
    }
    return res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export default {
  createOrder,
  getOrderById,
  getOrderByUser,
  getOrderByRestaurant,
};
