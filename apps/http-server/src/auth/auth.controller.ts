import { Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { contract, LoginSchema, RegisterSchema } from '@repo/contract/client';
import z from 'zod';

const AuthContract = nestControllerContract(contract.authContract);

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRest(AuthContract.register)
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @TsRest(AuthContract.login)
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }
}
