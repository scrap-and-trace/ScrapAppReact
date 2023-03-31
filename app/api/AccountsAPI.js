import axios from "axios";
import * as SecureStore from "expo-secure-store";

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
      "http://192.168.0.20:8000/api/auth/register/",
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
      "http://192.168.0.20:8000/api/auth/login/",
      {
        email,
        password,
      }
    );
    return await SecureStore.setItemAsync("token", response.data.token);
  }

  static async logout() {
    await SecureStore.deleteItemAsync("token");
  }

  static async getToken() {
    return await SecureStore.getItemAsync("token");
  }

  static async isLoggedIn() {
    const token = await this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  static async getAccount() {
    const response = await axios.get(
      "http://192.168.0.20:8000/api/auth/user/",
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }
  static async getAccountById(id) {
    const response = await axios.get("http://192.168.0.20:8000/user/" + id, {
      headers: {
        Authorization: `Token ${await this.getToken()}`,
      },
    });
    return response.data;
  }

  static async getFollowing(id) {
    const response = await axios.get("http://192.168.0.20:8000/user/" + id, {
      headers: {
        Authorization: `Token ${await this.getToken()}`,
      },
    });
    return response.data.following;
  }

  static async getAllUsers() {
    const response = await axios.get(
      "http://192.168.0.20:8000/api/auth/searchUsers/",
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data.results;
  }

  static async searchUsers(query) {
    const response = await axios.get(
      "http://192.168.0.20:8000/api/auth/searchUsers/?search=" + query,
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
      "http://192.168.0.20:8000/api/auth/followlist/" + scrapbook + "/",
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

  static async unfollowScrapbook(scrapbook) {
    const response = await axios.delete(
      "http://192.168.0.20:8000/api/auth/followlist/" + scrapbook + "/",
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async changeUsername(id, username) {
    const response = await axios.put(
      "http://192.168.0.20:8000/user/" + id + "/",
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
      "http://192.168.0.20:8000/user/" + id + "/",
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
      "http://192.168.0.20:8000/user/" + id + "/",
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
      "http://192.168.0.20:8000/user/" + id + "/",
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
      "http://192.168.0.20:8000/user/" + id + "/",
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

  static async changeProfilePic(id, image_url) {
    const response = await axios.put(
      "http://192.168.0.20:8000/user/" + id + "/",
      {
        image_url: image_url,
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
      "http://192.168.0.20:8000/user/" + id + "/",
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
      "http://192.168.0.20:8000/user/" + id + "/",
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

  static async changePassword(id, old_password, password, password2) {
    const response = await axios.post(
      "http://192.168.0.20:8000/user/" + id + "/set_password/",
      {
        old_password: old_password,
        password: password,
        password2: password2,
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
