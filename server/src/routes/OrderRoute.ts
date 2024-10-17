import express from "express";
import OrderController from "../controllers/OrderController";
import { param } from "express-validator";
import {  jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get(
  "/detail/:orderId",
  param("orderId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("orderId paramenter must be a valid string"),
  OrderController.getOrderById
);
router.get("/user", OrderController.getOrderByUser);
router.get(
  "/restaurant/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("userId paramenter must be a valid string"),
  OrderController.getOrderByRestaurant
);

export default router;
