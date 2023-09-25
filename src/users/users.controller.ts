import { Body, Controller, Get, Post } from '@nestjs/common';
import { JWTToken } from '../utils/token.decorator';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  list(@JWTToken() token) {
    return this.userService.findAll(token);
  }

  @Post()
  register(@JWTToken() token, @Body() body) {
    return this.userService.register(token, body);
  }
}
