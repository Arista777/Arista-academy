async function sendNotification({ channel, recipient, subject, message, metadata }) {
  // Placeholder for future integrations (WhatsApp, email, SMS)
  console.log("[notify]", { channel, recipient, subject, message, metadata });
}

export { sendNotification };
