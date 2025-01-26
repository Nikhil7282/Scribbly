import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prismaClient } from '@repo/db/client';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(payload: { username: string; password: string }) {
    const isValid = await this.validateUser(payload);
    if (!isValid) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'Login successful',
      token: this.createJwtToken(payload),
    };
  }

  async register() {}

  async validateUser(payload: {
    username: string;
    password: string;
  }): Promise<Boolean> {
    return true;
  }

  async createJwtToken(payload: { username: string; password: string }) {
    return this.jwtService.sign(payload);
  }
}
