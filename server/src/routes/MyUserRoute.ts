import express from "express" 
import MyUserController from "../controllers/MyUserController";
import {  jwtParse } from "../middleware/auth";


const router = express.Router();

router.get("/", jwtParse, MyUserController.getCurrentUser);
router.post("/", MyUserController.createCurrentUser);
router.put("/" , MyUserController.updateCurrentUser);

export default router;