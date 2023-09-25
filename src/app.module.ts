import { Module } from '@nestjs/common';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [
    LoginModule,
    UsersModule,
    KeycloakConnectModule.register({
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_CLIENT_SECRET,
      authServerUrl: process.env.KEYCLOAK_BASE_URL,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
