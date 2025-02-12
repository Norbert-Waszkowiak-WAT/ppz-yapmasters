import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from './users.schema';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { throwException } from 'src/responseStatus/auth.response';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(user.name) private readonly userModel: Model<user>,
    private readonly EmailService: EmailService,
  ) {}

  async deleteUser(user: user) {
    const email = user.email;
    await this.userModel.findOneAndDelete({ email });
  }
  async insertUser(username: string, password: string, email: string) {
    const newUser = new this.userModel({
      username,
      password,
      email,
    });
    await newUser.save();
    await this.EmailService.sendVerificationCode(email);
    return newUser;
  }
  async getUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
  async checkUniqueness(key: string, value: string): Promise<boolean> {
    const user = await this.userModel.findOne({ [key]: value });
    return !!user;
  }
  async verifyUserEmail(
    email: string,
    code: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.getUser(email);
    if (!user) {
      throwException.Usernotfound();
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throwException.IncorrectPassword();
    }
    const isCodeValid = await this.EmailService.verifyCode(email, code);
    if (!user) {
      throwException.Usernotfound();
    }
    if (user && passwordValid && isCodeValid) {
      return true;
    }

    if (user && passwordValid && !isCodeValid) {
      // throw new Error('Invalid or expired verification code');
    }
  }

  async generatePasswordResetToken(email: string): Promise<string | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour expiration
    await user.save();

    return token;
  }
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // Token must not be expired
    });

    if (!user) return false;

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return true;
  }
}
