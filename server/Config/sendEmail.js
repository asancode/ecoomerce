// import sendEmail from "./emailService.js"

// const sendEmailFun = async({to,subject,text,html})=>{
//     const result = await sendEmail(to,subject,text,html)
//     if(result.success){
//         return true
//     }else{
//         return false
//     }

// }
// export default sendEmailFun

import sendEmail from "./emailService.js";

// Before: returned only true/false, so callers never knew WHY an email failed.
// Now: returns the full result object so the caller can log/handle the real error.
const sendEmailFun = async ({ to, subject, text, html }) => {
  const result = await sendEmail(to, subject, text, html);

  if (!result.success) {
    console.error(`❌ Failed to send email to ${to}:`, result.error);
  }

  return result; // { success: true/false, messageId? , error? }
};

export default sendEmailFun;