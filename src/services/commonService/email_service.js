// Import nodemailer
const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD, 
  },
});

// Function to send emails

const generateEmailContent = (name, link, experience) => {
    return `
      <table style="width: 100%; max-width: 600px; margin: auto; border: 1px solid #ddd; border-spacing: 0; font-family: Arial, sans-serif;">
        <thead>
          <tr>
            <th style="background-color: #30d5c7; color: white; padding: 15px; text-align: center; font-size: 20px;">
              Interview Invitation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 20px; font-size: 16px; color: #333;">
              <p>Dear ${name},</p>
              <p>Thank you for applying for the post of Product Management position with ${experience} years of experience.</p>
              <p>Please click the button below to attend the interview:</p>
              <a href="${link}" style="text-decoration: none;">
                <button style="background-color: #30d5c7; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px;">
                  Start Interview
                </button>
              </a>
              <p style="margin-top: 20px;">Best regards,<br>HR Team</p>
            </td>
          </tr>
        </tbody>
      </table>
    `;
  };
const sendEmail = async (name,email,link, experience) => {
      
  try {
      const mailOptions = {
        from: "b.k.milindwaghmare@gmail.com", // Sender address
        to: email, // Receiver email
        subject: "Hiezy AI Interview Invite", // Email subject
        html: generateEmailContent(name, link, experience)
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
  

    return { success: true, message: "Emails sent successfully!" };
  } catch (error) {
    console.error("Error sending emails:", error);
    return { success: false, message: "Failed to send emails.", error };
  }
};

module.exports ={sendEmail}

