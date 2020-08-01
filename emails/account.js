const sgMail = require("@sendgrid/mail");

// API for sendgrid Server

const key = require("../config/keys").SENDGRID_API_KEY;

// Attaching our API key for sending
sgMail.setApiKey(key);
// const msg = {
//   to: "abhisheksharma0313@gmail.com",
//   from: "abhisheksharma0313@gmail.com",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail.send(msg);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "abhisheksharma0313@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the BinaryDiary, ${name}. Let me know how you get along with the app`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "abhisheksharma0313@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendCancelationEmail,
  sendWelcomeEmail,
};
