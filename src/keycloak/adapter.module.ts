import { Module } from '@nestjs/common';
import { KeycloakAdapter } from './keycloak.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [KeycloakAdapter],
  exports: [KeycloakAdapter],
})
export class AdapterModule {}
