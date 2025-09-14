import mongoose from "mongoose";

const ContactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   
  },
  email: {
    type: String,
    required: true,   
  },
  subject: {
    type: String,
    required: true,   
  },
  description: {
    type: String,
    required: true,   
  },
}, { timestamps: true });

export default mongoose.model("Contact", ContactFormSchema);
