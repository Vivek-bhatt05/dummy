import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message } = req.body;
    console.log(email,message)
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vivek.bhatt529@gmail.com',
        pass: 'vrvojprmusmvwdal',
      },
    });

 // Define the email content
    const mailOptions = {
      from: `${email}`,
      to: 'vivek.bhatt529@gmail.com',
      subject: 'Hello from Nodemailer',
      text: `Email: ${email}\nMessage: ${message}`,
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
