import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message } = req.body;
    console.log(email,message)
  
    const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'vivek.bhatt529@gmail.com',
    //     pass: 'vrvojprmusmvwdal',
    //   },
    host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: 'vk.bizhues@gmail.com',
        pass: 'BwOX5pm427hFcSPz',
      },
    });

 // Define the email content
    const mailOptions = {
      from : 'vk.bizhues@gmail.com',
      to : `${email}`,
      subject: 'Hello from Nodemailer',
      text: `Email: ${email}\nMessage: ${message}`,
      html : `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <title>Email Template</title>
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col">
              <h1>Contact Form Submission</h1>
              <p>Dear Admin,</p>
              <p>You have received a new contact form submission. Here are the details:</p>
              <ul>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Message:</strong> ${message}</li>
              </ul>
              <p>Thank you for your attention.</p>
              <hr>
              <p>Best regards,</p>
              <p>The Contact Form</p>
            </div>
          </div>
        </div>
      </body>
      </html>`
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
