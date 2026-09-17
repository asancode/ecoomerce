import sendEmailFun from "../Config/sendEmail.js";
import contactEmailTemplate from "../utils/contactEmailTemplate.js";
// import ContactModel from "../models/contactModel.js";
import ContactModel from "../models/contactModels.js";

export const sendContactMessageController = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
        error: true,
        success: false,
      });
    }

    // Save the message to database (optional, but recommended)
    const newContact = await new ContactModel({
      name,
      email,
      phone,
      subject,
      message,
    }).save();

    // ✅ Send notification email to admin/business inbox
    const emailResult = await sendEmailFun({
      to: process.env.ADMIN_EMAIL || "nabiullahansari4321@gmail.com", // apna admin email .env me set karein
      subject: `New Contact Form Message: ${subject || "General Inquiry"}`,
      text: "",
      html: contactEmailTemplate({ name, email, phone, subject, message }),
    });

    if (!emailResult.success) {
      console.error("Contact form: failed to send notification email:", emailResult.error);
      // Message DB me save ho chuka hai, isliye user ko success hi bhejenge
      return res.status(200).json({
        message: "Your message was received. We'll get back to you soon.",
        error: false,
        success: true,
      });
    }

    return res.status(200).json({
      message: "Your message has been sent successfully!",
      error: false,
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};