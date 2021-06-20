const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "./../test.env" });
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.get("/*", (req, res) => {
  res.send({ abc: "abc" });
});

router.post("/create", async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "sgd",
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

module.exports = router;
