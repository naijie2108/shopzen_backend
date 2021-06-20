const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);

app.get("/", (req, res) => {
  res.send("test");
});

//Payment routes
app.use("/payments", require("./routes/payments"));
app.listen(PORT, () => console.log(PORT));
