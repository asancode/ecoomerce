// const verifyEmailTemplate =({name,url})=>{
//     return
//     `<p>Dear ${name}</p>
//     <p>Thank you for registering Binkeyit.</p>
//     <a href=${url} style="c></a>
//     `

// }
// const verifyEmailTemplate =(username,otp)=>{
//     return`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <title>Email Verification</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       background-color: #f4f6f8;
//       font-family: Arial, Helvetica, sans-serif;
//     }
//     .email-wrapper {
//       width: 100%;
//       padding: 20px 0;
//       background-color: #f4f6f8;
//     }
//     .email-container {
//       max-width: 600px;
//       margin: auto;
//       background: #ffffff;
//       border-radius: 8px;
//       overflow: hidden;
//       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
//     }
//     .email-header {
//       background: #2563eb;
//       color: #ffffff;
//       padding: 20px;
//       text-align: center;
//     }
//     .email-header h1 {
//       margin: 0;
//       font-size: 24px;
//     }
//     .email-body {
//       padding: 30px;
//       color: #333333;
//       line-height: 1.6;
//     }
//     .email-body h2 {
//       margin-top: 0;
//       font-size: 20px;
//     }
//     .otp-box {
//       margin: 25px 0;
//       padding: 15px;
//       background: #f1f5f9;
//       border: 2px dashed #2563eb;
//       text-align: center;
//       font-size: 26px;
//       font-weight: bold;
//       letter-spacing: 4px;
//       color: #2563eb;
//       border-radius: 6px;
//     }
//     .email-footer {
//       padding: 20px;
//       text-align: center;
//       font-size: 13px;
//       color: #777777;
//       background: #fafafa;
//     }
//     .email-footer a {
//       color: #2563eb;
//       text-decoration: none;
//     }
//   </style>
// </head>
// <body>
//   <div class="email-wrapper">
//     <div class="email-container">

//       <!-- Header -->
//       <div class="email-header">
//         <h1>Email Verification</h1>
//       </div>

//       <!-- Body -->
//       <div class="email-body">
//         <h2>${{username}},</h2>

//         <p>
//           Thank you for signing up with us. To complete your registration,
//           please use the One-Time Password (OTP) below to verify your email address.
//         </p>

//         <div class="otp-box">
//           ${{otp}}
//         </div>

//         <p>
//           This OTP is valid for the next <strong>10 minutes</strong>.
//           Please do not share this code with anyone for security reasons.
//         </p>

//         <p>
//           If you did not request this verification, please ignore this email.
//         </p>
//    <p>
//           Best regards,<br />
//           <strong>Teyyar Cake Team</strong>
//         </p>
//       </div>

//       <!-- Footer -->
//       <div class="email-footer">
//         <p>
//           © 2025 Teyyar cake. All rights reserved.<br/>
//           Need help? <a href="./contact-us">Contact Support</a>
//         </p>
//       </div>
//     </div>
//   </div>
// </body>
// </html>
// `
// }
// export default verifyEmailTemplate

const verifyEmailTemplate = ({ name, verifyCode }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }
    .email-wrapper {
      width: 100%;
      padding: 20px 0;
      background-color: #f4f6f8;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }
    .email-header {
      background: #2563eb;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
  
    .expiry-box {
      margin-top: 18px;
      padding: 12px 15px;
      background-color: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 10px;
      text-align: center;
    }

    .expiry-text {
      margin: 0;
      color: #c2410c;
      font-size: 14px;
      line-height: 1.5;
    }

    .expiry-time {
      font-weight: 800;
      color: #ea580c;
    }
    .email-body {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }
    .email-body h2 {
      margin-top: 0;
      font-size: 20px;
    }
    .otp-box {
      margin: 25px 0;
      padding: 15px;
      background: #f1f5f9;
      border: 2px dashed #2563eb;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #2563eb;
      border-radius: 6px;
    }
    .email-footer {
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #777777;
      background: #fafafa;
    }
    .email-footer a {
      color: #2563eb;
      text-decoration: none;
    }
      @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 15px 10px;
      }

      .header {
        padding: 28px 20px;
      }

      .brand {
        font-size: 24px;
      }

      .body {
        padding: 30px 20px;
      }

      .title {
        font-size: 22px;
      }

      .otp-box {
        font-size: 25px;
        letter-spacing: 5px;
        padding: 13px 18px;
      }

      .footer {
        padding: 20px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">

      <div class="email-header">
        <h1>Email Verification</h1>
      </div>

      <div class="email-body">
        <h2>Hello ${name},</h2>

        <p>
          Thank you for signing up with us. To complete your registration,
          please use the One-Time Password (OTP) below to verify your email address.
        </p>

        <div class="otp-box">
          ${verifyCode}
        </div>

         <div class="expiry-box">

            <p class="expiry-text">
              ⏱️ This verification code is valid for
              <span class="expiry-time">1 minute</span>.
            </p>

          </div>

        <p>
          If you did not request this verification, please ignore this email.
        </p>

        <p>
          Best regards,<br />
          <strong>Teyyar Cake Team</strong>
        </p>
      </div>

      <div class="email-footer">
        <p>
          © 2025 Teyyar Cake. All rights reserved.<br/>
          Need help? <a href="https://teyyarcake.com/contact-us">Contact Support</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`;
};

export default verifyEmailTemplate;
