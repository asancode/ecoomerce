// import nodemailer from "nodemailer";

// // ============================================================
// // TRANSPORTER
// // ============================================================
// // .env me ye 2 values honi chahiye:
// // EMAIL_USER = your-gmail@gmail.com
// // EMAIL_PASS = Gmail App Password (normal password nahi chalega)
// // Kaise banaye App Password: Google Account -> Security -> 2-Step Verification -> App Passwords
// // ADMIN_EMAIL = jis email par aapko naye order/return ki notification chahiye

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     if (!to) return false;

//     await transporter.sendMail({
//       from: `"Your Store" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     return true;
//   } catch (error) {
//     console.error("sendEmail Error:", error.message);
//     return false;
//   }
// };

// // ============================================================
// // ORDER PLACED EMAIL (customer + admin)
// // ============================================================
// // Isse apne existing order-creation controller me, order save hone
// // ke baad call karein. Example neeche order.controller.snippet.js me hai.

// export const sendOrderPlacedEmail = async (order) => {
//   const customerEmail =
//     order?.delivery_address?.email || order?.email || order?.user?.email;

//   const productRows = (order?.products || [])
//     .map(
//       (p) => `
//       <tr>
//         <td style="padding:8px;border:1px solid #eee;">${p.productTitle}</td>
//         <td style="padding:8px;border:1px solid #eee;text-align:center;">${p.quantity}</td>
//         <td style="padding:8px;border:1px solid #eee;text-align:right;">AED ${Number(
//           p.price || 0
//         ).toFixed(2)}</td>
//       </tr>`
//     )
//     .join("");

//   const html = `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
//       <h2 style="color:#0f172a;">Order Confirmed 🎉</h2>
//       <p>Hi ${order?.delivery_address?.name || "Customer"},</p>
//       <p>Thank you for your order. Here are your order details:</p>
//       <p><b>Order ID:</b> ${order?.orderId || order?._id}</p>
//       <table style="width:100%;border-collapse:collapse;margin:16px 0;">
//         <thead>
//           <tr style="background:#f8fafc;">
//             <th style="padding:8px;border:1px solid #eee;text-align:left;">Product</th>
//             <th style="padding:8px;border:1px solid #eee;">Qty</th>
//             <th style="padding:8px;border:1px solid #eee;">Price</th>
//           </tr>
//         </thead>
//         <tbody>${productRows}</tbody>
//       </table>
//       <p><b>Total: AED ${Number(
//         order?.totalAmt || order?.totalAmount || 0
//       ).toFixed(2)}</b></p>
//       <p>We will notify you once your order is out for delivery.</p>
//       <p style="color:#64748b;font-size:13px;margin-top:24px;">This is an automated email, please do not reply.</p>
//     </div>
//   `;

//   // Customer ko confirmation
//   await sendEmail({
//     to: customerEmail,
//     subject: `Order Confirmed - #${order?.orderId || order?._id}`,
//     html,
//   });

//   // Aapko (admin) notification
//   await sendEmail({
//     to: process.env.ADMIN_EMAIL,
//     subject: `🛒 New Order Received - #${order?.orderId || order?._id}`,
//     html,
//   });
// };

// // ============================================================
// // RETURN / EXCHANGE REQUEST EMAIL (customer + admin)
// // ============================================================

// export const sendReturnRequestEmail = async (returnRequest, userEmail) => {
//   const html = `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
//       <h2 style="color:#0f172a;">${
//         returnRequest.type === "return" ? "Return" : "Exchange"
//       } Request Received</h2>
//       <p><b>Product:</b> ${returnRequest.product.productTitle}</p>
//       <p><b>Reason:</b> ${returnRequest.reason}</p>
//       ${
//         returnRequest.description
//           ? `<p><b>Details:</b> ${returnRequest.description}</p>`
//           : ""
//       }
//       <p><b>Status:</b> Pending Review</p>
//       <p>We will review your request and get back to you within 24-48 hours.</p>
//     </div>
//   `;

//   await sendEmail({
//     to: userEmail,
//     subject: `${
//       returnRequest.type === "return" ? "Return" : "Exchange"
//     } Request Received`,
//     html,
//   });

//   await sendEmail({
//     to: process.env.ADMIN_EMAIL,
//     subject: `New ${returnRequest.type} Request - ${returnRequest.product.productTitle}`,
//     html,
//   });
// };

// // ============================================================
// // RETURN/EXCHANGE STATUS UPDATE EMAIL (customer)
// // ============================================================

// export const sendReturnStatusUpdateEmail = async (returnRequest, userEmail) => {
//   const statusText = {
//     approved: "Approved ✅",
//     rejected: "Rejected ❌",
//     completed: "Completed 🎉",
//     cancelled: "Cancelled",
//   }[returnRequest.status] || returnRequest.status;

//   const html = `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
//       <h2 style="color:#0f172a;">Your ${returnRequest.type} request has been updated</h2>
//       <p><b>Product:</b> ${returnRequest.product.productTitle}</p>
//       <p><b>Status:</b> ${statusText}</p>
//       ${
//         returnRequest.adminNote
//           ? `<p><b>Note from our team:</b> ${returnRequest.adminNote}</p>`
//           : ""
//       }
//     </div>
//   `;

//   await sendEmail({
//     to: userEmail,
//     subject: `Update on your ${returnRequest.type} request`,
//     html,
//   });
// };

import nodemailer from "nodemailer";

// ============================================================
// TRANSPORTER
// ============================================================
// ✅ Aapki .env me pehle se EMAIL aur EMAIL_PASS maujood hain, isliye
// wahi use kiye — koi naya variable add karne ki zaroorat nahi.
// Agar order/return notifications ek alag admin email par chahiye
// (store email se different), .env me ADMIN_EMAIL bhi add kar sakte
// hain — na ho to ye khud EMAIL par hi gir jaayega.

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL;

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!to) return false;

    await transporter.sendMail({
      from: `"Teyyar Cake" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error("sendEmail Error:", error.message);
    return false;
  }
};

// ============================================================
// ORDER PLACED EMAIL (customer + admin)
// ============================================================
export const sendOrderPlacedEmail = async (order) => {
  const customerEmail =
    order?.delivery_address?.email || order?.email || order?.userId?.email;

  const productRows = (order?.products || [])
    .map(
      (p) => `
      <tr>
        <td style="padding:8px;border:1px solid #eee;">${p.productTitle}</td>
        <td style="padding:8px;border:1px solid #eee;text-align:center;">${p.quantity}</td>
        <td style="padding:8px;border:1px solid #eee;text-align:right;">AED ${Number(
          p.price || 0
        ).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h2 style="color:#0f172a;">Order Confirmed 🎉</h2>
      <p>Hi ${order?.delivery_address?.name || "Customer"},</p>
      <p>Thank you for your order. Here are your order details:</p>
      <p><b>Order ID:</b> ${order?.orderId || order?._id}</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="padding:8px;border:1px solid #eee;text-align:left;">Product</th>
            <th style="padding:8px;border:1px solid #eee;">Qty</th>
            <th style="padding:8px;border:1px solid #eee;">Price</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>
      <p><b>Payment:</b> ${
        order?.payment_status === "CASH ON DELIVERY"
          ? "Cash on Delivery"
          : "Paid (Card)"
      }</p>
      <p><b>Total: AED ${Number(order?.totalAmt || 0).toFixed(2)}</b></p>
      <p>We will notify you once your order is out for delivery.</p>
      <p style="color:#64748b;font-size:13px;margin-top:24px;">This is an automated email, please do not reply.</p>
    </div>
  `;

  // Customer ko confirmation
  await sendEmail({
    to: customerEmail,
    subject: `Order Confirmed - #${order?.orderId || order?._id}`,
    html,
  });

  // Aapko (admin) notification
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🛒 New Order Received - #${order?.orderId || order?._id}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#0f172a;">New Order Received</h2>
        <p><b>Order ID:</b> ${order?.orderId || order?._id}</p>
        <p><b>Payment:</b> ${order?.payment_status}</p>
        <p><b>Total: AED ${Number(order?.totalAmt || 0).toFixed(2)}</b></p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr style="background:#f8fafc;">
              <th style="padding:8px;border:1px solid #eee;text-align:left;">Product</th>
              <th style="padding:8px;border:1px solid #eee;">Qty</th>
              <th style="padding:8px;border:1px solid #eee;">Price</th>
            </tr>
          </thead>
          <tbody>${productRows}</tbody>
        </table>
        <p><b>Deliver to:</b> ${
          [
            order?.delivery_address?.address_line1,
            order?.delivery_address?.city,
            order?.delivery_address?.state,
            order?.delivery_address?.country,
          ]
            .filter(Boolean)
            .join(", ") || "N/A"
        }</p>
      </div>
    `,
  });
};

// ============================================================
// RETURN / EXCHANGE REQUEST EMAIL (customer + admin)
// ============================================================
// export const sendReturnRequestEmail = async (returnRequest, userEmail) => {
//   const html = `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
//       <h2 style="color:#0f172a;">${
//         returnRequest.type === "return" ? "Return" : "Exchange"
//       } Request Received</h2>
//       <p><b>Product:</b> ${returnRequest.product.productTitle}</p>
//       <p><b>Reason:</b> ${returnRequest.reason}</p>
//       ${
//         returnRequest.description
//           ? `<p><b>Details:</b> ${returnRequest.description}</p>`
//           : ""
//       }
//       <p><b>Status:</b> Pending Review</p>
//       <p>We will review your request and get back to you within 24-48 hours.</p>
//     </div>
//   `;

//   await sendEmail({
//     to: userEmail,
//     subject: `${
//       returnRequest.type === "return" ? "Return" : "Exchange"
//     } Request Received`,
//     html,
//   });

//   await sendEmail({
//     to: ADMIN_EMAIL,
//     subject: `New ${returnRequest.type} Request - ${returnRequest.product.productTitle}`,
//     html,
//   });
// };
// ============================================================
// EMAIL TEMPLATE HELPER
// ============================================================

const STATUS_STYLES = {
  pending: { bg: "#fef3c7", color: "#92400e", label: "Pending Review" },
  approved: { bg: "#dbeafe", color: "#1e40af", label: "Approved" },
  rejected: { bg: "#fee2e2", color: "#991b1b", label: "Rejected" },
  completed: { bg: "#d1fae5", color: "#065f46", label: "Completed" },
  cancelled: { bg: "#f1f5f9", color: "#475569", label: "Cancelled" },
};

const buildReturnEmailHtml = (returnRequest, { isAdmin = false } = {}) => {
  const {
    type,
    product = {},
    reason,
    description,
    images = [],
    status = "pending",
    order,
    createdAt,
  } = returnRequest;

  const typeLabel = type === "return" ? "Return" : "Exchange";
  const statusInfo = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const uploadedImage = images?.[0] || null;
  const productImage = product?.image || null;

  const requestDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  const orderRefId =
    (typeof order === "object" ? order?.orderId || order?._id : order) || "N/A";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${typeLabel} Request</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:24px 12px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;color:#94a3b8;font-size:12px;letter-spacing:1px;text-transform:uppercase;">
                      Teyyar Cake &amp; Flower
                    </p>
                    <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">
                      ${isAdmin ? `New ${typeLabel} Request` : `${typeLabel} Request Received`}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- STATUS BADGE -->
          <tr>
            <td style="padding:24px 32px 0;">
              <span style="display:inline-block;background-color:${statusInfo.bg};color:${statusInfo.color};font-size:12px;font-weight:600;padding:6px 14px;border-radius:999px;">
                ${statusInfo.label}
              </span>
              <span style="display:inline-block;margin-left:8px;color:#94a3b8;font-size:12px;">
                ${requestDate}
              </span>
            </td>
          </tr>

          <!-- INTRO TEXT -->
          <tr>
            <td style="padding:16px 32px 0;">
              <p style="margin:0;color:#334155;font-size:14px;line-height:22px;">
                ${
                  isAdmin
                    ? `A customer has submitted a new ${type} request. Details are below — please review and take action.`
                    : `We've received your ${type} request. Our team will review it and get back to you within <b>24–48 hours</b>.`
                }
              </p>
            </td>
          </tr>

          <!-- PRODUCT CARD -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
                <tr>
                  <!-- Product image -->
                  <td width="88" style="padding:16px;vertical-align:top;">
                    <img
                      src="${productImage || "https://via.placeholder.com/72x72.png?text=No+Image"}"
                      width="72"
                      height="72"
                      alt="${product?.productTitle || "Product"}"
                      style="display:block;width:72px;height:72px;object-fit:cover;border-radius:10px;border:1px solid #e2e8f0;background-color:#ffffff;"
                    />
                  </td>
                  <!-- Product details -->
                  <td style="padding:16px 16px 16px 0;vertical-align:top;">
                    <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">
                      ${product?.productTitle || "N/A"}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                      <tr>
                        <td style="color:#64748b;font-size:12.5px;padding-right:16px;">
                          Qty: <span style="color:#0f172a;font-weight:600;">${product?.quantity ?? "N/A"}</span>
                        </td>
                        <td style="color:#64748b;font-size:12.5px;">
                          Price: <span style="color:#0f172a;font-weight:600;">AED ${Number(product?.price || 0).toFixed(2)}</span>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:8px 0 0;color:#64748b;font-size:12.5px;">
                      Order ID: <span style="color:#0f172a;font-weight:600;">${orderRefId}</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- REQUEST DETAILS -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                    <p style="margin:0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Request Type</p>
                    <p style="margin:4px 0 0;color:#0f172a;font-size:14px;font-weight:600;">${typeLabel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                    <p style="margin:0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Reason</p>
                    <p style="margin:4px 0 0;color:#0f172a;font-size:14px;">${reason || "N/A"}</p>
                  </td>
                </tr>
                ${
                  description
                    ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                    <p style="margin:0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Additional Details</p>
                    <p style="margin:4px 0 0;color:#334155;font-size:13.5px;line-height:20px;">${description}</p>
                  </td>
                </tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- UPLOADED PHOTO PREVIEW -->
          ${
            uploadedImage
              ? `
          <tr>
            <td style="padding:20px 32px 0;">
              <p style="margin:0 0 10px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">
                Uploaded Photo
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="${uploadedImage}" target="_blank" style="text-decoration:none;">
                      <img
                        src="${uploadedImage}"
                        alt="Uploaded reference"
                        width="536"
                        style="display:block;width:100%;max-width:536px;max-height:320px;object-fit:cover;border-radius:12px;border:1px solid #e2e8f0;"
                      />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- CTA -->
          ${
            isAdmin
              ? `
          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:10px;background-color:#0f172a;">
                    <a href="${process.env.ADMIN_PANEL_URL || "#"}"
                       style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:13.5px;font-weight:600;text-decoration:none;">
                      Review Request
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- FOOTER -->
          <tr>
            <td style="padding:32px;">
              <hr style="border:none;border-top:1px solid #f1f5f9;margin:0 0 20px;" />
              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:18px;text-align:center;">
                Teyyar Cake &amp; Flower · UAE<br />
                This is an automated notification. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

// ============================================================
// SEND RETURN REQUEST EMAIL (customer + admin)
// ============================================================

export const sendReturnRequestEmail = async (returnRequest, userEmail) => {
  const typeLabel = returnRequest.type === "return" ? "Return" : "Exchange";

  // Customer email
  await sendEmail({
    to: userEmail,
    subject: `${typeLabel} Request Received — ${returnRequest.product?.productTitle || ""}`,
    html: buildReturnEmailHtml(returnRequest, { isAdmin: false }),
  });

  // Admin email
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New ${typeLabel} Request — ${returnRequest.product?.productTitle || ""}`,
    html: buildReturnEmailHtml(returnRequest, { isAdmin: true }),
  });
};

// ============================================================
// SEND STATUS UPDATE EMAIL (customer)
// ============================================================

// export const sendReturnStatusUpdateEmail = async (returnRequest, userEmail) => {
//   const typeLabel = returnRequest.type === "return" ? "Return" : "Exchange";

//   await sendEmail({
//     to: userEmail,
//     subject: `${typeLabel} Request Update — ${returnRequest.product?.productTitle || ""}`,
//     html: buildReturnEmailHtml(returnRequest, { isAdmin: false }),
//   });
// };

// ============================================================
// RETURN/EXCHANGE STATUS UPDATE EMAIL (customer)
// ============================================================
export const sendReturnStatusUpdateEmail = async (returnRequest, userEmail) => {
  const statusText =
    {
      approved: "Approved ✅",
      rejected: "Rejected ❌",
      completed: "Completed 🎉",
      cancelled: "Cancelled",
    }[returnRequest.status] || returnRequest.status;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
      <h2 style="color:#0f172a;">Your ${returnRequest.type} request has been updated</h2>
      <p><b>Product:</b> ${returnRequest.product.productTitle}</p>
      <p><b>Status:</b> ${statusText}</p>
      ${
        returnRequest.adminNote
          ? `<p><b>Note from our team:</b> ${returnRequest.adminNote}</p>`
          : ""
      }
    </div>
  `;

  await sendEmail({
    to: userEmail,
    subject: `Update on your ${returnRequest.type} request`,
    html,
  });
};