import ConatctFormSchema from "../Models/ContactFormSchema.js";



export const contactPost = async (req, res) => {
  try {
    const { name, email, subject, description } = req.body;

    const contact = new ConatctFormSchema({
      name,
      email,
      subject,
      description
    });
    await contact.save();
    res.status(201).json(contact);
    console.log(req.files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



