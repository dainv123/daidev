import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessage, ContactMessageDocument, ContactMessageStatus, MailStatus } from './contact-messages.schema';
const nodemailer = require('nodemailer');

function getMailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' ? true : false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

async function sendMail({ to, subject, text, html }: { to: string; subject: string; text: string; html?: string }) {
  const transporter = getMailTransporter();
  await transporter.sendMail({
    from: `${process.env.MAIL_FROM_NAME || 'Support'} <${process.env.MAIL_FROM}>`,
    to,
    subject,
    text,
    html,
  });
}

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectModel(ContactMessage.name) private contactMessageModel: Model<ContactMessageDocument>,
  ) {}

  async create(createContactMessageDto: any, tenantId: string): Promise<ContactMessage> {
    const contactMessage = new this.contactMessageModel({
      ...createContactMessageDto,
      tenantId,
      isRead: false,
      isReplied: false,
      status: ContactMessageStatus.NEW,
    });
    const saved = await contactMessage.save();

    let status = ContactMessageStatus.NEW;
    let errorMessage = '';

    // Gửi mail xác nhận cho user
    try {
      if (saved.email) {
        await sendMail({
          to: saved.email,
          subject: '[YourSite] We have received your contact message',
          text: `Hello ${saved.name},\n\nThank you for contacting us. We have received your information and will respond as soon as possible.\n\nYour message:\n- Subject: ${saved.subject}\n- Content: ${saved.message}\n\nBest regards,\n[YourSite] Support Team`,
        });
      }
    } catch (err: any) {
      status = ContactMessageStatus.ERROR;
      errorMessage = err?.message || 'Failed to send confirmation email';
      await this.contactMessageModel.findByIdAndUpdate(saved._id, { status, errorMessage });
      return await this.contactMessageModel.findById(saved._id);
    }

    // Gửi mail thông báo cho admin
    try {
      if (process.env.ADMIN_EMAIL) {
        await sendMail({
          to: process.env.ADMIN_EMAIL,
          subject: `[YourSite] New contact message from ${saved.name}`,
          text: `You have received a new contact message:\n- Name: ${saved.name}\n- Email: ${saved.email}\n- Subject: ${saved.subject}\n- Content: ${saved.message}\n\nPlease check the dashboard to reply.`,
        });
      }
    } catch (err: any) {
      status = ContactMessageStatus.ERROR;
      errorMessage = err?.message || 'Failed to send admin notification email';
      await this.contactMessageModel.findByIdAndUpdate(saved._id, { status, errorMessage });
      return await this.contactMessageModel.findById(saved._id);
    }

    // Nếu không lỗi, đảm bảo status là 'new' và xóa errorMessage
    await this.contactMessageModel.findByIdAndUpdate(saved._id, { status: ContactMessageStatus.NEW, errorMessage: '' });
    return await this.contactMessageModel.findById(saved._id);
  }

  async findAll(tenantId: string): Promise<ContactMessage[]> {
    return this.contactMessageModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string, tenantId: string): Promise<ContactMessage | null> {
    return this.contactMessageModel.findOne({ _id: id, tenantId }).exec();
  }

  async update(id: string, updateContactMessageDto: any, tenantId: string): Promise<ContactMessage> {
    const contactMessage = await this.contactMessageModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateContactMessageDto,
      { new: true }
    ).exec();
    
    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }
    
    return contactMessage;
  }

  async markAsRead(id: string, tenantId: string): Promise<ContactMessage> {
    const contactMessage = await this.contactMessageModel.findOneAndUpdate(
      { _id: id, tenantId },
      { isRead: true },
      { new: true }
    ).exec();
    
    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }
    
    return contactMessage;
  }

  async markAsReplied(id: string, tenantId: string): Promise<ContactMessage> {
    const contactMessage = await this.contactMessageModel.findOneAndUpdate(
      { _id: id, tenantId },
      { isReplied: true },
      { new: true }
    ).exec();
    
    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }
    
    return contactMessage;
  }

  async delete(id: string, tenantId: string): Promise<void> {
    const result = await this.contactMessageModel.findOneAndDelete({ _id: id, tenantId }).exec();
    if (!result) {
      throw new NotFoundException('Contact message not found');
    }
  }

  // Trả lời contact message và gửi mail cho user
  async reply(id: string, replyContent: string, tenantId: string, adminEmail?: string): Promise<ContactMessage> {
    const now = new Date();
    const contactMessage = await this.contactMessageModel.findOne({ _id: id, tenantId });
    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }
    // Mặc định trạng thái gửi mail
    let userMailStatus = MailStatus.PENDING;
    let userMailError = '';
    let adminMailStatus = MailStatus.PENDING;
    let adminMailError = '';
    // Gửi mail cho user
    try {
      if (contactMessage.email) {
        await sendMail({
          to: contactMessage.email,
          subject: '[YourSite] Response to your contact message',
          text: `Hello ${contactMessage.name},\n\nWe have reviewed your message and our response is as follows:\n\n${replyContent}\n\nIf you have further questions, please contact us again.\n\nBest regards,\n[YourSite] Support Team`,
        });
        userMailStatus = MailStatus.SENT;
      }
    } catch (err: any) {
      userMailStatus = MailStatus.ERROR;
      userMailError = err?.message || 'Failed to send reply email to user';
    }
    // Nếu gửi mail user lỗi thì không cập nhật isReplied, chỉ log lại
    if (userMailStatus === MailStatus.ERROR) {
      contactMessage.status = ContactMessageStatus.ERROR;
      contactMessage.errorMessage = userMailError;
      contactMessage.replyLog = contactMessage.replyLog || [];
      contactMessage.replyLog.push({
        content: replyContent,
        repliedAt: now,
        adminEmail: adminEmail || null,
        userMailStatus,
        userMailError,
        adminMailStatus: MailStatus.PENDING,
        adminMailError: '',
      });
      await contactMessage.save();
      return contactMessage;
    }
    // Nếu gửi mail user thành công, gửi tiếp cho admin
    try {
      if (process.env.ADMIN_EMAIL) {
        await sendMail({
          to: process.env.ADMIN_EMAIL,
          subject: `[YourSite] Admin replied to contact message from ${contactMessage.name}`,
          text: `Admin replied to contact message:\n- Name: ${contactMessage.name}\n- Email: ${contactMessage.email}\n- Subject: ${contactMessage.subject}\n- Content: ${contactMessage.message}\n- Reply: ${replyContent}\n\nReplied at: ${now.toISOString()}`,
        });
        adminMailStatus = MailStatus.SENT;
      }
    } catch (err: any) {
      adminMailStatus = MailStatus.ERROR;
      adminMailError = err?.message || 'Failed to send reply email to admin';
    }
    // Cập nhật log và trạng thái cuối cùng
    contactMessage.isReplied = true;
    contactMessage.repliedAt = now;
    contactMessage.status = ContactMessageStatus.REPLIED;
    contactMessage.errorMessage = adminMailStatus === MailStatus.ERROR ? adminMailError : '';
    contactMessage.replyLog = contactMessage.replyLog || [];
    contactMessage.replyLog.push({
      content: replyContent,
      repliedAt: now,
      adminEmail: adminEmail || null,
      userMailStatus,
      userMailError,
      adminMailStatus,
      adminMailError,
    });
    await contactMessage.save();
    return contactMessage;
  }
} 