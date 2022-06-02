import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() dto: AuthSignUpDto): Promise<{ token: string }> {
    return this.service.signUp(dto);
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: AuthSignInDto): Promise<{ token: string }> {
    return this.service.signIn(dto);
  }
}
