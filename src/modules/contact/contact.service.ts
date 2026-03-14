import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { ContactFormDto } from './dto/contact-form.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
  }

  async sendContactMessage(contactFormDto: ContactFormDto): Promise<{ success: boolean; message: string }> {
    const { name, email, subject, message } = contactFormDto;

    try {
      const mailOptions = {
        from: this.configService.get('MAIL_FROM'),
        to: this.configService.get('MAIL_USER'),
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #8B5CF6;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #555;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #888; font-size: 14px;">
                This message was sent from your portfolio website contact form.
              </p>
            </div>
          </div>
        `,
        replyTo: email,
      };

      await this.transporter.sendMail(mailOptions);
      
      this.logger.log(`Contact message sent successfully from ${email}`);
      return {
        success: true,
        message: 'Your message has been sent successfully! I\'ll get back to you soon.',
      };
    } catch (error) {
      this.logger.error('Failed to send contact message', error);
      return {
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.',
      };
    }
  }
}