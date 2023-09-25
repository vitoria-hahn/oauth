import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AdapterModule } from '../keycloak/adapter.module';
import { UserService } from './users.service';

@Module({
  imports: [AdapterModule],
  providers: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
