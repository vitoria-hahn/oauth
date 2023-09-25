import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginRequest } from '../utils/Requests.types';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('login')
  @Public()
  login(@Body() body: LoginRequest) {
    return this.loginService.login(body);
  }
}
