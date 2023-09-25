import { Module } from '@nestjs/common';
import { AdapterModule } from '../keycloak/adapter.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [AdapterModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
