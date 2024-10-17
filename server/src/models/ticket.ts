import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  message: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
