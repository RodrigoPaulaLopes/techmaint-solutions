import { Injectable } from '@nestjs/common';
import { Attachment, EmailParams, EmailSettings, MailerSend, Recipient, Sender } from 'mailersend';
import { Personalization } from 'mailersend/lib/modules/Email.module';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EmailService {

  private mailerClient: Partial<MailerSend>;

  constructor() {

    this.mailerClient = new MailerSend({
      apiKey: process.env.API_KEY,
    });
  }

  async sendEmail(to: User[], subject: string,  html?: string, text?: string) {
    const sentFrom = new Sender(process.env.SENDER, process.env.SENDER_TITLE);

    const recipients = to.map(user => new Recipient(user.email, user.name))


    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(html)

    const response = await this.mailerClient.email.send(emailParams)

    return { "message": "email has been sent for the email" }
  }

}
