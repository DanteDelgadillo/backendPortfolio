const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/form", (req, res) => {
  const msg = {
    to: "ddantedelgadillo@gmail.com",
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    html: req.body.message
  };

  sgMail
    .send(msg)
    .then(console.log(req.body.message))
    .catch(err => console.error(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on pory ${PORT}`);
});
