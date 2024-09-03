// Import the Mailgun library
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
require("dotenv").config();

// Your Mailgun API key and domain
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

if (!API_KEY) {
  throw new Error("MAILGUN_API_KEY is not defined in environment variables");
}

if (!DOMAIN) {
  throw new Error("MAILGUN_DOMAIN is not defined in environment variables");
}

// Create the Mailgun client
const mg = mailgun.client({
  username: "api",
  key: API_KEY,
});

// Function to send an email
async function sendEmail(topic, contentJSON) {
  let htmlContent = "";
  let textContent = "";

  if (topic === "contact") {
    htmlContent = `
      <h1>New Contact Request</h1>
      <ul>
        <li><strong>Name:</strong> ${contentJSON.name}</li>
        <li><strong>Nachricht:</strong> ${contentJSON.message}</li>
        <li><strong>Telefon:</strong> ${
          contentJSON.phone
            ? contentJSON.phone
            : "Keine Telefonnummer angegeben"
        }</li>
        <li><strong>E-Mail:</strong> ${contentJSON.email}</li>
      </ul>
    `;
    textContent = `New ${topic}\n\nName: ${contentJSON.name}\nMessage: ${
      contentJSON.message
    }\nPhone: ${contentJSON.phone ? contentJSON.phone : "N/A"}\nEmail: ${
      contentJSON.email
    }`;
  } else if (topic === "enrol") {
    htmlContent = `
      <h1>New Enrolment</h1>
      <ul>
        <li><strong>First Name:</strong> ${contentJSON.firstName}</li>
        <li><strong>Last Name:</strong> ${contentJSON.lastName}</li>
        <li><strong>Address:</strong> ${contentJSON.address}</li>
        <li><strong>Phone:</strong> ${contentJSON.phone}</li>
        <li><strong>Email:</strong> ${contentJSON.email}</li>
        <li><strong>Birthday:</strong> ${
          contentJSON.birthday
            ? new Date(contentJSON.birthday).toLocaleDateString()
            : "N/A"
        }</li>
        <li><strong>Medication:</strong> ${contentJSON.medication}</li>
        <li><strong>Can Swim:</strong> ${
          contentJSON.canSwim ? "Yes" : "No"
        }</li>
        <li><strong>Is Vegetarian:</strong> ${
          contentJSON.isVegetarian ? "Yes" : "No"
        }</li>
        <li><strong>Is Vaccinated:</strong> ${
          contentJSON.isVacc ? "Yes" : "No"
        }</li>
        <li><strong>Can Bivouac:</strong> ${
          contentJSON.canBivouac ? "Yes" : "No"
        }</li>
        <li><strong>Can be Photographed:</strong> ${
          contentJSON.canPhoto ? "Yes" : "No"
        }</li>
        <li><strong>Wants T-Shirt:</strong> ${
          contentJSON.wantsTshirt ? "Yes" : "No"
        }</li>
        <li><strong>T-Shirt Size:</strong> ${contentJSON.tshirtSize}</li>
        <li><strong>Additional Info:</strong> ${contentJSON.additionalInfo}</li>
      </ul>
    `;
    textContent = `New ${topic}\n\nFirst Name: ${
      contentJSON.firstName
    }\nLast Name: ${contentJSON.lastName}\nAddress: ${
      contentJSON.address
    }\nPhone: ${contentJSON.phone}\nEmail: ${contentJSON.email}\nBirthday: ${
      contentJSON.birthday
        ? new Date(contentJSON.birthday).toLocaleDateString()
        : "N/A"
    }\nMedication: ${contentJSON.medication}\nCan Swim: ${
      contentJSON.canSwim ? "Yes" : "No"
    }\nIs Vegetarian: ${
      contentJSON.isVegetarian ? "Yes" : "No"
    }\nIs Vaccinated: ${contentJSON.isVacc ? "Yes" : "No"}\nCan Bivouac: ${
      contentJSON.canBivouac ? "Yes" : "No"
    }\nCan be Photographed: ${
      contentJSON.canPhoto ? "Yes" : "No"
    }\nWants T-Shirt: ${
      contentJSON.wantsTshirt ? "Yes" : "No"
    }\nT-Shirt Size: ${contentJSON.tshirtSize}\nAdditional Info: ${
      contentJSON.additionalInfo
    }`;
  } else {
    throw new Error("Unknown topic");
  }

  const messageData = {
    from: "ZeltlagerBot <mailgun@your-domain.com>",
    to: "johannes.a.breitenbach@gmail.com",
    subject: `New ${topic}`,
    text: textContent,
    html: htmlContent,
  };

  try {
    const response = await mg.messages.create(DOMAIN, messageData);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
