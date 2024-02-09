const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")("sk_test_51NfLjISHOxv3pnMQ5fKQ7R7N4KmCJurv3puRYZWsKVvNiJZ8wsdyWzFctuWocYHC5eSJXMoGjn6kzDo7rLVbG8qE00iZGEpwAH");

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const amount = ((req.body.amount))
    const myPayment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      metadata: {
        company: "AleeZaInnovation",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);


module.exports = router;