import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Redis from 'ioredis';
import { Model, Types } from 'mongoose';
import { user } from 'src/users/users.schema';

@Injectable()
export class SessionsService {
  private readonly redis: Redis;

  constructor(@InjectModel(user.name) private userModel: Model<user>) {
    this.redis = new Redis();
  }

  async saveSession(
    userId: string,
    sessionId: string,
    ttl?: number,
  ): Promise<void> {
    const key = `user:${userId}`;
    const timestamp = Date.now();
    await this.redis.sadd(key, sessionId, timestamp);
    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }

  async getSessions(userId: string): Promise<string[]> {
    const key = `user:${userId}`;
    return this.redis.smembers(key); // Get all session IDs for the user
  }

  async deleteSession(userId: string, sessionId: string): Promise<void> {
    const key = `user:${userId}`;
    await this.redis.srem(key, sessionId); // Remove the session ID from the set
  }
  async renewSessionTTL(
    userId: string,
    sessionId: string,
    ttl: number,
  ): Promise<void> {
    const key = `user:${userId}`;
    const exists = await this.redis.sismember(key, sessionId); // Check if the session exists
    if (exists) {
      await this.redis.expire(key, ttl); // Renew TTL for the user's session set
    }
  }

  async checkIfSessionIsValid(
    sessionId: string,
    userId: string,
  ): Promise<boolean> {
    const key = `user:${userId}`;
    const sessionExists = await this.redis.sismember(key, sessionId);
    return sessionExists === 1;
  }
  async deleteAllSessions(userId: string): Promise<void> {
    const key = `user:${userId}`;
    await this.redis.del(key); // Delete the user's session set
  }

  async checkIfSessionIsActive(sessionID: string) {
    const sessionKey = `sess:${sessionID}`;
    const sessionExists = await this.redis.get(sessionKey);
    return sessionExists;
  }
  async getUserInfo(user: string) {
    const userInfo = await this.getUser(user);
    const responseData = {
      username: userInfo.username,
      email: userInfo.email,
    };
    return responseData;
  }

  async getUser(userId: string): Promise<user> {
    const user = await this.userModel
      .findById(new Types.ObjectId(userId))
      .exec();
    return user;
  }
}
