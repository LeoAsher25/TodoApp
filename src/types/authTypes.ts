export interface LoginRequestData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  status_code: number;
  access_token: string;
  token_type: string;
}
