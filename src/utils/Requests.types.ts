export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserRegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface KeycloakUserRegisterRequest {
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp?: boolean;
  emailVerified?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes?: [];
  requiredActions?: [];
  notBefore?: number;
  access?: {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
  };
  credentials: [
    {
      type: string;
      value: string;
      temporary: boolean;
    },
  ];
}
