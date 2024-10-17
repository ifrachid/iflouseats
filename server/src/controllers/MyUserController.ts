import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.auth0Id != auth0Id) {
      existingUser.auth0Id = auth0Id;
      existingUser.save();
      return res.status(204).json(existingUser.toObject());
    } else if (existingUser && existingUser.auth0Id == auth0Id) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating the user." });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Error: User not found" });
    }
    user.auth0Id = req.auth0Id;

    await user.save();
    res.status(200).json({ message: "Updated the User" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error udpating user" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messsage: "Something went wrong" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
