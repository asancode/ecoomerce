// // import nodemailer from "nodemailer";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //     host: "smtp.gmail.com",
// //     port: 465,
// //     secure: true,
// //   auth: {
// //     user: process.env.EMAIL,       // your Gmail address
// //     pass: process.env.EMAIL_PASS,  // Gmail App Password
// //   },
// // });

// // async function sendEmail(to, subject, text, html) {
// //   try {
// //     const info = await transporter.sendMail({
// //       from: `"teyyar cake" <${process.env.EMAIL}>`,
// //       to,
// //       subject,
// //       text,
// //       html,
// //     });

// //     return {
// //       success: true,
// //       messageId: info.messageId,
// //     };
// //   } catch (error) {
// //     console.error("Error sending email:", error);
// //     return {
// //       success: false,
// //       error: error.message,
// //     };
// //   }
// // }

// // export default sendEmail;

// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// // ⚠️ IMPORTANT: EMAIL_PASS must be a Gmail "App Password" (16 chars, no spaces),
// // NOT your normal Gmail login password. Gmail blocks normal passwords for SMTP.
// // Generate one here: https://myaccount.google.com/apppasswords
// // (Requires 2-Step Verification to be enabled on the Gmail account.)

// if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
//   console.error(
//     "❌ EMAIL or EMAIL_PASS is missing in .env — emails will NOT be sent."
//   );
// }

// // NOTE: Don't mix `service` with manual `host`/`port`. Using `service: "gmail"`
// // alone is enough — nodemailer already knows Gmail's host/port/secure settings.
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Verify connection once at startup so you see the real error in logs immediately
// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ Email transporter verification failed:", error.message);
//   } else {
//     console.log("✅ Email server is ready to send messages");
//   }
// });

// async function sendEmail(to, subject, text, html) {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Teyyar Cake" <${process.env.EMAIL}>`,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("✅ Email sent:", info.messageId, "to:", to);

//     return {
//       success: true,
//       messageId: info.messageId,
//     };
//   } catch (error) {
//     // This log is the most important line for debugging "OTP email not received"
//     console.error("❌ Error sending email to", to, ":", error.message);
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

// export default sendEmail;
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ⚠️ IMPORTANT: EMAIL_PASS must be a Gmail "App Password" (16 chars, no spaces),
// NOT your normal Gmail login password. Gmail blocks normal passwords for SMTP.
// Generate one here: https://myaccount.google.com/apppasswords
// (Requires 2-Step Verification to be enabled on the Gmail account.)

if (!process.env.EMAIL || !process.env.EMAIL_PASS) {
  console.error(
    "❌ EMAIL or EMAIL_PASS is missing in .env — emails will NOT be sent."
  );
}

// NOTE: Don't mix `service` with manual `host`/`port`. Using `service: "gmail"`
// alone is enough — nodemailer already knows Gmail's host/port/secure settings.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection once at startup so you see the real error in logs immediately
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email transporter verification failed:", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Teyyar Cake" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId, "to:", to);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    // This log is the most important line for debugging "OTP email not received"
    console.error("❌ Error sending email to", to, ":", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default sendEmail;