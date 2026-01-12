import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: this.configService.get('EMAIL_FROM'),
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const subject = 'Welcome to Our SaaS Platform!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome ${name}!</h1>
        <p>Thank you for joining our platform. We're excited to have you on board.</p>
        <p>Get started by exploring our features and upgrading to a premium plan for advanced capabilities.</p>
        <div style="margin: 30px 0;">
          <a href="${this.configService.get('CLIENT_URL')}/dashboard" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Go to Dashboard
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you have any questions, feel free to contact our support team.
        </p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${this.configService.get('CLIENT_URL')}/reset-password?token=${resetToken}`;
    const subject = 'Password Reset Request';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Password Reset</h1>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <div style="margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 1 hour. If you didn't request this, please ignore this email.
        </p>
        <p style="color: #666; font-size: 12px;">
          Or copy this link: ${resetUrl}
        </p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendSubscriptionConfirmationEmail(
    email: string,
    name: string,
    plan: string,
    amount: number,
  ): Promise<void> {
    const subject = 'Subscription Confirmation';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Subscription Confirmed!</h1>
        <p>Hi ${name},</p>
        <p>Your subscription to the <strong>${plan.toUpperCase()}</strong> plan has been confirmed.</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Subscription Details</h3>
          <p><strong>Plan:</strong> ${plan.toUpperCase()}</p>
          <p><strong>Amount:</strong> $${(amount / 100).toFixed(2)} USD</p>
          <p><strong>Billing Cycle:</strong> Monthly</p>
        </div>
        <div style="margin: 30px 0;">
          <a href="${this.configService.get('CLIENT_URL')}/dashboard" 
             style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            View Dashboard
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          Thank you for your business!
        </p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendPaymentSuccessEmail(
    email: string,
    name: string,
    amount: number,
    invoiceUrl?: string,
  ): Promise<void> {
    const subject = 'Payment Successful';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Payment Received</h1>
        <p>Hi ${name},</p>
        <p>We've successfully received your payment of <strong>$${(amount / 100).toFixed(2)} USD</strong>.</p>
        ${invoiceUrl ? `
        <div style="margin: 30px 0;">
          <a href="${invoiceUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            View Invoice
          </a>
        </div>
        ` : ''}
        <p style="color: #666; font-size: 14px;">
          Thank you for your payment!
        </p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendPaymentFailedEmail(email: string, name: string, reason: string): Promise<void> {
    const subject = 'Payment Failed';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc3545;">Payment Failed</h1>
        <p>Hi ${name},</p>
        <p>Unfortunately, your recent payment could not be processed.</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <div style="margin: 30px 0;">
          <a href="${this.configService.get('CLIENT_URL')}/subscription" 
             style="background-color: #ffc107; color: #333; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Update Payment Method
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          Please update your payment information to continue using our services.
        </p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }

  async sendSubscriptionCancelledEmail(email: string, name: string, endDate: Date): Promise<void> {
    const subject = 'Subscription Cancelled';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Subscription Cancelled</h1>
        <p>Hi ${name},</p>
        <p>Your subscription has been cancelled and will remain active until <strong>${endDate.toLocaleDateString()}</strong>.</p>
        <p>You can reactivate your subscription at any time before this date.</p>
        <div style="margin: 30px 0;">
          <a href="${this.configService.get('CLIENT_URL')}/subscription" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Reactivate Subscription
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          We're sorry to see you go. If you have any feedback, we'd love to hear it.
        </p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }
}
