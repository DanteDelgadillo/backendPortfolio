const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

app.post("/api/form", cors(corsOptions), (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ddantedelgadillo@gmail.com",
      pass: "Dragon213"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: req.body.email,
    to: "ddantedelgadillo@gmail.com",
    subject: req.body.subject,
    text: req.body.name + " " + req.body.email + " " + req.body.message
  };

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.log("Error");
    } else {
      console.log("Email Sent");
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on pory ${PORT}`);
});
