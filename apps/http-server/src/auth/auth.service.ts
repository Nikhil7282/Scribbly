import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { prismaClient } from '@repo/db/client';

import { LoginDto, RegisterDto, UpdateUserDto, User } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(payload: LoginDto) {
    const user = await this.validateUser(payload);

    if (user === null) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      token: this.createJwtToken(user),
    };
  }

  async register(payload: RegisterDto) {
    const userExists = await prismaClient.user.findUnique({
      where: { email: payload.email },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await prismaClient.user.create({
      data: {
        username: payload.username,
        password: hashedPassword,
        email: payload.email,
      },
    });

    return {
      message: 'User created',
      user,
    };
  }

  async editUserDetails(payload: UpdateUserDto, user: User) {
    const validEmail = await prismaClient.user.findFirst({
      where: {
        email: payload.email,
        id: {
          not: user.id,
        },
      },
    });

    if (validEmail) {
      throw new BadRequestException('Email already exists');
    }

    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        username: payload.username,
        email: payload.email,
      },
    });

    return {
      message: 'User details updated',
    };
  }

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: { email: payload.email },
    });
    return user;
  }

  private createJwtToken(payload: User) {
    return this.jwtService.sign(payload);
  }
}
