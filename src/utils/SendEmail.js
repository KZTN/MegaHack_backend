const nodemailer = require('nodemailer');

module.exports = async function SendConfirmationEmail(email, subject, message) {
  console.log(`eu recebi: ${email}`);

  const transport = nodemailer.createTransport({
    name: 'imap.gmail.com',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'estimuloifrn@gmail.com', // replace with your Mailtrap credentials
      pass: '@Pedro6535210195',
    },
    debug: true, // show debug output
    logger: true, // log information in console
  });

  await transport.sendMail({
    from: 'Estimulo IFRN <estimuloifrn@gmail.com>',
    to: email,
    subject,
    text: message,
  });
};
