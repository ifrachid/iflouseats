import { Request, Response } from "express";
import Contact from "../models/Contact";

const createTicket = async (req: Request, res: Response) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({ message: "Ticket Submitted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating the ticket." });
  }
};

export default { createTicket };
