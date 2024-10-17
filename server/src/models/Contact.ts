import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
  createAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
