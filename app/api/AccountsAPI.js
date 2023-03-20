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
    const response = await axios.get("http://94.173.211.21:8000/user/" + id, {
      headers: {
        Authorization: `Token ${await this.getToken()}`,
      },
    });
    return response.data.following;
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
      "http://94.173.211.21:8000/api/auth/followlist/" + scrapbook + "/",
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

  static async changeUsername(id, username) {
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

  static async getLikesByUser(userId) {
    const response = await axios.get(
      `http://94.173.211.21:8000/api/auth/userlikes/${userId}`
    );
    return response.data.results[0];
  }

  static async getLikesByPage(pageId) {
    // Count the number of results in the array
    const response = await axios.get(
      `http://94.173.211.21:8000/api/auth/likes/${pageId}`
    );
    return response.data.results.length;
  }

  static async createLike(userId, pageId) {
    const response = await axios.post(
      `http://94.173.211.21:8000/api/auth/likes/${pageId}`,
      {
        liker: userId,
        liked_page: pageId,
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
  /*static async createLike(
    userId,
    pageId
    ) {
      let data = JSON.stringify({
        liker: userId,
        liked_page: pageId,
      })
    const response = await axios.post(
      `http://94.173.211.21:8000/api/auth/likes/${pageId}`,
      data
    );
    return response.data;
  }*/

  static async getLikeById(id) {
    const response = await axios.get(
      `http://94.173.211.21:8000/api/auth/likes/${id}`
    );
    return response.data;
  }

  static async changeBirthday(id, dob) {
    const response = await axios.put(
      "http://94.173.211.21:8000/user/" + id + "/",
      {
        dob: dob,
      }
    );
  }
  static async deleteLike(id) {
    const response = await axios.delete(
      `http://94.173.211.21:8000/api/auth/deletelike/${id}`,
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async deleteLike(id) {
    const response = await axios.delete(
      `http://94.173.211.21:8000/api/auth/deletelike/${id}`,
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }
}
