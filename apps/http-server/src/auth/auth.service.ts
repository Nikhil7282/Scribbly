import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login() {}

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
