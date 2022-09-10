import axiosInstance from "src/api/axiosInstance";
import { LoginRequestData } from "src/types/authTypes";

const authApiAction = {
  login: (data: LoginRequestData) => {
    
  },
  logout: () => {
    const url = "/logout";
  },
};

export default authApiAction;
