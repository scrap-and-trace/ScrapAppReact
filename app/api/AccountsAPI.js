// IP: http://94.173.211.21:8000/api/auth

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AccountsAPI {
  static async register(
    username,
    first_name,
    last_name,
    email,
    dob,
    phone,
    password
  ) {
    const response = await axios.post(
      "http://94.173.211.21:8000/api/auth/register/",
      {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        dob: dob,
        phone: phone,
        password: password,
      }
    );
    return response.data;
  }

  static async login(email, password) {
    const response = await axios.post(
      "http://94.173.211.21:8000/api/auth/login/",
      {
        email: email,
        password: password,
      }
    );
    return await AsyncStorage.setItem("token", response.data.token);
  }

  static async getToken() {
    return await AsyncStorage.getItem("token");
  }

  static async getAccount() {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/user/",
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async getIsAuthenticated() {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/user/",
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.ok;
  }
}
