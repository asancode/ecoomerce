import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Payment Intent create karo — checkout page par "Pay now" dabate hi
// yeh call hota hai, taaki Stripe CardElement confirm kar sake.
export const stripePaymentController = async (req, res) => {
  try {
    const { totalAmt, products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Products are required",
      });
    }

    const amount = Number(totalAmt);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        error: true,
        success: false,
        message: `Invalid total amount: ${totalAmt}`,
      });
    }

    // Stripe smallest currency unit (fils) me leta hai
    const stripeAmount = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: stripeAmount,
      currency: "aed",
      payment_method_types: ["card"],
      metadata: {
        userId: req.userId?.toString() || "",
        products: JSON.stringify(
          products.map((item) => ({
            productId: item.productId,
            title: item.productTitle,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    });

    return res.status(200).json({
      error: false,
      success: true,
      message: "Payment intent created",
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.log("Stripe Error:", error.message);
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

// ✅ Card payment SUCCESSFUL hua ya nahi, yeh sirf Stripe se hi verify karo —
// frontend ke bheje "payment_status: success" par kabhi bharosa mat karo,
// warna koi bhi user bina paise diye order place kar sakta hai.
// createOrderController isi function ko andar se call karta hai.
export const verifyStripePayment = async (paymentIntentId, expectedAmount) => {
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (intent.status !== "succeeded") {
    return { valid: false, reason: "Payment Not successful" };
  }

  const expectedStripeAmount = Math.round(Number(expectedAmount) * 100);
  if (intent.amount !== expectedStripeAmount) {
    return { valid: false, reason: "Amount mismatch — order create Not Created" };
  }

  return { valid: true, intent };
};

// ✅ Stripe webhook — payment success/fail ko reliably track karta hai,
// tab bhi jab user browser band kar de ya network fail ho jaaye.
export const stripeWebhookController = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature verify fail:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const OrderModel = (await import("../models/orderModel.js")).default;

  switch (event.type) {
    case "payment_intent.succeeded": {
      const intent = event.data.object;
      await OrderModel.findOneAndUpdate(
        { paymentId: intent.id },
        { payment_status: "PAID", order_status: "Confirmed" }
      );
      break;
    }
    case "payment_intent.payment_failed": {
      const intent = event.data.object;
      await OrderModel.findOneAndUpdate(
        { paymentId: intent.id },
        { payment_status: "FAILED" }
      );
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
};
