const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Configure your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

app.post('/send-email', (req, res) => {
  const { toEmail, subject, htmlContent } = req.body;

  // Write HTML content to a file
  const filePath = path.join(__dirname, 'email.html');
  fs.writeFileSync(filePath, htmlContent, 'utf8');

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: toEmail,
    subject: subject,
    text: 'Please see the attached HTML file.',
    attachments: [
      {
        filename: 'email.html',
        path: filePath,
        contentType: 'text/html',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, message: `Failed to send email: ${error.message}` });
    }
    res.status(200).send({ success: true, message: 'Email sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});