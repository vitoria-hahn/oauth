import { Injectable } from '@nestjs/common';
import { KeycloakAdapter } from '../keycloak/keycloak.adapter';
import { LoginRequest } from '../utils/Requests.types';

@Injectable()
export class LoginService {
  constructor(private keycloakAdapter: KeycloakAdapter) {}

  async login(request: LoginRequest) {
    return this.keycloakAdapter.login(request);
  }
}
