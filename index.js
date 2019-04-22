// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// const cors = require("cors");
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// app.post("/api/form", (req, res) => {
//   const msg = {
//     to: "ddantedelgadillo@gmail.com",
//     from: req.body.email,
//     subject: req.body.subject,
//     text: req.body.message,
//     html: req.body.message
//   };
//   sgMail
//     .send(msg)
//     .then(console.log(req.body.message))
//     .catch(err => console.log(err));
// });

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server listening on pory ${PORT}`);
// });
const express = require("express"); //needed to launch server
const cors = require("cors"); //needed to disable sendgrid security
const sgMail = require("@sendgrid/mail"); //sendgrid library to send emails

const app = express(); //alias from the express function

//sendgrid api key
sgMail.setApiKey(
  "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"
);

app.use(cors()); //utilize Cors so the browser doesn't restrict data, without it Sendgrid will not send!

// Welcome page of the express server:
app.get("/", (req, res) => {
  res.send("Welcome to the Sendgrid Emailing Server");
});

app.get("/send-email", (req, res) => {
  //Get Variables from query string in the search bar
  const { email, subject, message } = req.query;

  //Sendgrid Data Requirements
  const msg = {
    to: "ddantedelgadillo@gmail.com",
    from: email,
    subject: subject,
    text: message
  };

  //Send Email
  sgMail.send(msg).then(console.log(message));
});

// to access server run 'nodemon index.js' then click here: http://localhost:4000/
app.listen(4000, () => console.log("Running on Port 4000"));
