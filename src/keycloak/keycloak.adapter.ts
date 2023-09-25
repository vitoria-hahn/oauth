import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ObservableInput, catchError, firstValueFrom, of } from 'rxjs';
import {
  KeycloakUserRegisterRequest,
  LoginRequest,
} from '../utils/Requests.types';
import { KeycloakLoginResponse } from '../utils/Response.types';
import { configDotenv } from 'dotenv';

configDotenv();

@Injectable()
export class KeycloakAdapter {
  constructor(private http: HttpService) {}

  private readonly realmUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}`;
  private readonly adminRealmUrl = `${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}`;
  private readonly baseParams = {
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
  };

  async login({
    username,
    password,
  }: LoginRequest): Promise<KeycloakLoginResponse> {
    const params = new URLSearchParams({
      ...this.baseParams,
      grant_type: 'password',
      username,
      password,
    });

    const observalble = this.http
      .post(`${this.realmUrl}/protocol/openid-connect/token`, params)
      .pipe(catchError(this.handleKeycloakError));

    return (await firstValueFrom(observalble)).data;
  }

  async getUsers(token: string) {
    const observalble = this.http
      .get(`${this.adminRealmUrl}/users`, { headers: { Authorization: token } })
      .pipe(catchError(this.handleKeycloakError));

    return (await firstValueFrom(observalble)).data;
  }

  async registerUser(token: string, req: KeycloakUserRegisterRequest) {
    const observalble = this.http
      .post(`${this.adminRealmUrl}/users`, req, {
        headers: { Authorization: token },
      })
      .pipe(catchError(this.handleKeycloakError));

    return (await firstValueFrom(observalble)).data;
  }

  private handleKeycloakError(err: AxiosError): ObservableInput<any> {
    console.error('Error connecting to keycloak', err);
    if (err.response?.status === 401) throw new UnauthorizedException();
    if (err.response?.status === 403) throw new ForbiddenException();
    if (err.response?.status === 409)
      throw new ConflictException(err.response.data);
    throw new BadRequestException(err.response.data);
    return of();
  }
}
