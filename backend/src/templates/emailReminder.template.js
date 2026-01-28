export const emiReminderTemplate = ({ name, amount, dueDate, property }) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>EMI Payment Reminder</h2>
      <p>Hi <strong>${name}</strong>,</p>

      <p>This is a reminder that your EMI payment is due.</p>

      <ul>
        <li><strong>Property:</strong> ${property}</li>
        <li><strong>Amount:</strong> ₹${amount}</li>
        <li><strong>Due Date:</strong> ${new Date(dueDate).toDateString()}</li>
      </ul>

      <p>Please ensure timely payment to avoid penalties.</p>

      <br />
      <p>— DealSense Team</p>
    </div>
  `;
};
