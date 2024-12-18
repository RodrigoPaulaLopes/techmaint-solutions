import { Injectable } from '@nestjs/common';
import { Attachment, EmailParams, EmailSettings, MailerSend, Recipient, Sender } from 'mailersend';
import { Personalization } from 'mailersend/lib/modules/Email.module';

@Injectable()
export class EmailService {

  private mailerClient: Partial<MailerSend>;

  constructor() {

    this.mailerClient = new MailerSend({
      apiKey: 'mlsn.1264d4539bac900b7a738dcf092c80f7b9e0d5ac14bf11592ff0b27dd5b7d96c',
    });
  }

  async sendEmail(to: string, subject: string,  html?: string, text?: string) {
    const sentFrom = new Sender("rodrigo@trial-3z0vklo98m1l7qrx.mlsender.net", "TechMaint Solutions");

    const recipients = [
      new Recipient(to, "rodrigo lopes")
    ];


    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(html)

    const response = await this.mailerClient.email.send(emailParams)

    return { "message": "email has been sent for the email" }
  }

}
