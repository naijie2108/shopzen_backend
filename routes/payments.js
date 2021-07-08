const express = require("express");
const router = express.Router();
const stripe = require("stripe")(`${process.env.STRIPE_API_KEY}`);

router.get("/*", (req, res) => {
  res.send({ abc: "abc" });
});

router.post("/create", async (req, res) => {
  try {
    const { amount, shipping } = req.body;
    if (shipping) {
      const paymentIntent = await stripe.paymentIntents.create({
        shipping,
        amount,
        currency: "sgd",
      });
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "sgd",
      });
    }
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

module.exports = router;
