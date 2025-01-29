import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterSchema } from '@repo/contract/client';
import { prismaClient } from '@repo/db/client';
import { LoginDto, RegisterDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(payload: LoginDto) {
    const isValid = await this.validateUser(payload);
    if (!isValid) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'Login successful',
      token: this.createJwtToken(payload),
    };
  }

  async register(payload: RegisterDto) {
    const userExists = await prismaClient.user.findUnique({
      where: { email: payload.email },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const user = await prismaClient.user.create({
      data: {
        username: payload.username,
        password: payload.password,
        email: payload.email,
      },
    });

    return {
      message: 'User created',
      user,
    };
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<Boolean> {
    const isUserValid = await prismaClient.user.findFirst({
      where: { username: payload.email }, // Use 'where' to filter by username
    });
    return true;
  }

  async createJwtToken(payload: { password: string; email: string }) {
    return this.jwtService.sign(payload);
  }
}
