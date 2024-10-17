import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtParse } from "../middleware/auth";
import {
  validateMyRestaurantRequest,
  validateMyUserRequest,
} from "../middleware/validation";
import MyRestaurantController from "../controllers/MyRestaurantController";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});
router.get("/", MyRestaurantController.getMyRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,

  
  MyRestaurantController.createMyRestaurant
);
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,

  
  MyRestaurantController.updateMyRestaurant
);
export default router;
