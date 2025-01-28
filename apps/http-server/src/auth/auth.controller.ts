import { Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { contract } from '@repo/contract/client';
// import type { RegisterDto } from '@repo/contract/client';

const AuthContract = nestControllerContract(contract.authContract);

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRest(AuthContract.register)
  async register(@Body() newAuth: any) {
    return {};
  }

  @TsRest(AuthContract.login)
  async login(@Body() payload: { username: string; password: string }) {
    return this.authService.login(payload);
  }
}
