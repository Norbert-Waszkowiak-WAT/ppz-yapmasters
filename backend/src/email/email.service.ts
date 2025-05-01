import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from '../users/users.schema';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(@InjectModel(user.name) private userModel: Model<user>) {}

  async sendVerificationCode(email: string) {
    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Update the user document with the code and expiration (10 minutes)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10);
    await this.userModel.updateOne(
      { email },
      { verificationCode, verificationCodeExpires: expirationTime },
    );

    // Send the email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another service
      auth: {
        user: process.env.EMAIL_USER, // Set in .env
        pass: process.env.EMAIL_PASS, // Set in .env
      },
    });

    const templatePath = path.join(
      process.cwd(),
      'src/email/templates/verification.html',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const user = await this.userModel.findOne({ email }).exec();
    // Prepare the email content
    const emailContent = template({
      username: user.username, // Extracts username from email, or replace as needed
      verificationCode,
      expiresIn: '10 minutes',
    });

    // Email options with compiled HTML content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      html: emailContent,
    };
    return transporter.sendMail(mailOptions);
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    // Check if code matches and is still valid

    const isCodeValid =
      user.verificationCode === code &&
      user.verificationCodeExpires > new Date();

    if (isCodeValid) {
      // Clear the verification code upon successful verification
      user.isEmailverified = true;
      user.verificationCode = null;
      user.verificationCodeExpires = null;
      await user.save();
    }

    return isCodeValid;
  }
  async sendPasswordResetEmail(email: string, username: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const baseUrl = process.env.BASE_URL;
    const resetUrl = `${baseUrl}/users/reset-password/${token}`;

    // Load and compile the email template
    const templatePath = path.join(
      process.cwd(),
      'src/email/templates/reset-password.html',
    );
    const source = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(source);
    const html = template({ username, resetUrl });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html,
    };

    return transporter.sendMail(mailOptions);
  }
}
