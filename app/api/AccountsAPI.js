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
        username,
        first_name,
        last_name,
        email,
        dob,
        phone,
        password,
      }
    );
    return response.data;
  }

  static async login(email, password) {
    const response = await axios.post(
      "http://94.173.211.21:8000/api/auth/login/",
      {
        email,
        password,
      }
    );
    return await AsyncStorage.setItem("token", response.data.token);
  }

  static async logout() {
    const response = await axios.post(
      "http://94.173.211.21:8000/api/auth/logout/",
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async getToken() {
    return await AsyncStorage.getItem("token");
  }

  static async isLoggedIn() {
    const token = await this.getToken();
    return token !== null;
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
  static async getAccountById(id) {
    const response = await axios.get("http://94.173.211.21:8000/user/" + id, {
      headers: {
        Authorization: `Token ${await this.getToken()}`,
      },
    });
    return response.data;
  }
  static async getFollowing(id) {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/followlist/" + id,
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async getAllUsers() {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/searchUsers/"
    );
    return response.data.results;
  }

  static async searchUsers(query) {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/searchUsers/?search=" + query,
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data.results;
  }

  static async followScrapbook(follower, scrapbook) {
    const response = await axios.post(
      "http://94.173.211.21:8000/api/auth/followlist/" + id,
      {
        follower,
        scrapbook,
      },
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async changeUsername(id, username,) {
    const response = await axios.put(
      "http://94.173.211.21:8000/user/" + id + "/",
      {
        username: username,
      },
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async changeFirstName(id, first_name) {
    const response = await axios.put(
      "http://94.173.211.21:8000/user/" + id + "/",
      {
        first_name: first_name,
      },
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async changeLastName(id, last_name) {
    const response = await axios.put(
      "http://94.173.211.21:8000/user/" + id + "/",
      {
        last_name: last_name,
      },
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async changePhoneNum(id, phone) {
    const response = await axios.put(
      "http://94.173.211.21:8000/user/" + id + "/",
      {
        phone: phone,
      },
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async changeBirthday(id, dob) {
    const response = await axios.put(
      "http://94.173.211.21:8000/user/" + id + "/",
      {
        dob: dob,
      },
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }
}
