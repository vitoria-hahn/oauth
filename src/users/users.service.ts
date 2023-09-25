import { Injectable } from '@nestjs/common';
import { KeycloakAdapter } from '../keycloak/keycloak.adapter';
import {
  KeycloakUserRegisterRequest,
  UserRegisterRequest,
} from '../utils/Requests.types';

@Injectable()
export class UserService {
  constructor(private keycloakAdapter: KeycloakAdapter) {}

  async findAll(token: string) {
    return this.keycloakAdapter.getUsers(token);
  }

  async register(token: string, user: UserRegisterRequest) {
    const keycloakRequest: KeycloakUserRegisterRequest = {
      createdTimestamp: new Date().getTime(),
      email: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false,
        },
      ],
      enabled: true,
    };

    return this.keycloakAdapter.registerUser(token, keycloakRequest);
  }
}
