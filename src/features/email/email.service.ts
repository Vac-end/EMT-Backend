import { envConfig } from '@config/env.config';
import { logger } from '@utils/logger';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: envConfig.EMAIL_USER,
    pass: envConfig.EMAIL_PASS,
  },
});

export const emailService = {
  send: async (to: string, subject: string, text: string) => {
    try {
      await transporter.sendMail({
        from: envConfig.EMAIL_USER,
        to,
        subject,
        text,
      });
      logger.info(`Email sent to ${to}`);
    } catch (err) {
      logger.error('Failed to send email', err);
      throw new Error('Email sending failed');
    }
  },
};