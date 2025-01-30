import { Controller, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import {
  contract,
  LoginSchema,
  RegisterSchema,
  UpdateUserSchema,
} from '@repo/contract/client';
import z from 'zod';
import { AuthGuard } from '@nestjs/passport';

const AuthContract = nestControllerContract(contract.authContract);

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

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

  @UseGuards(AuthGuard('jwt'))
  @TsRest(AuthContract.updateUser)
  async updateUser(@Body() payload: UpdateUserDto) {
    return this.authService.editUserDetails(payload);
  }
}
