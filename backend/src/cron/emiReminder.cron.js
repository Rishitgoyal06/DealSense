import cron from 'node-cron';
import { PaymentSchedule } from '../models/paymentSchedule.model.js';
import { sendEmail } from '../utils/email.js';
import { emiReminderTemplate } from '../templates/emiReminder.template.js';

export const emiReminderCron = () => {
  cron.schedule('0 9 * * *', async () => {
    const today = new Date();

    const duePayments = await PaymentSchedule.find({
      nextDueDate: { $lte: today },
      status: 'pending',
    }).populate('leadId userId');

    for (const payment of duePayments) {
      const user = payment.userId;
      const lead = payment.leadId;

      if (!user?.email) continue;

      await sendEmail({
        to: user.email,
        subject: 'EMI Payment Reminder',
        html: emiReminderTemplate({
          name: lead.name,
          amount: payment.emiAmount,
          dueDate: payment.nextDueDate,
          property: lead.propertyType || 'Property',
        }),
      });
    }
  });
};
