const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/form", async (req, res) => {
  const msg = {
    to: "ddantedelgadillo@gmail.com",
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    html: req.body.message
  };

  try {
    await sgMail.send(msg);
    console.log(req.body.message);
    return res.status(200).json();
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: err.toString() });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on pory ${PORT}`);
});
