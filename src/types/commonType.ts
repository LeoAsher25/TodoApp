export interface ResponseWithMessage {
  status_code: number;
  message: string;
}

export enum RouterPaths {
  LOGIN = "/login",
  HOME = "/",
  USER = "/user",
  TODO = "/to-do",
  SETTING = "/setting",
  PROFILE = "/profile",
}

export enum RequestStatus {
  LOADING = "Loading",
  SUCCESS = "Successful",
  ERROR = "Error",
}
