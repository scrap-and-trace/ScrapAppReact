import axios from "axios";
import * as SecureStore from "expo-secure-store";
export default class ScrapbookAPI {
  constructor(title, author, friends_only) {
    this.title = title;
    this.author = author;
    this.friends_only = friends_only;
  }

  static async getToken() {
    return await SecureStore.getItemAsync("token");
  }

  static async getScrapbooks() {
    const response = await axios.get(
      "http://192.168.0.20:8000/api/auth/scrapbooks/",
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data.results;
  }

  static async getScrapbook(id) {
    const response = await axios.get(
      "http://192.168.0.20:8000/api/auth/scrapbooks/?id=" + id,
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data.results[0];
  }

  static async getPages(id) {
    const response = await axios.get(
      "http://192.168.0.20:8000/api/auth/pages/?scrapbook=" + id,
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data.results.pages;
  }

  static async createScrapbook(title, author, friends_only) {
    const response = await axios.post(
      "http://192.168.0.20:8000/api/auth/scrapbooks/",
      {
        title: title,
        author: author,
        friends_only: friends_only,
      },
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data;
  }

  static async deleteScrapbook(id) {
    const response = await axios.delete(
      "http://192.168.0.20:8000/api/auth/deletescrapbook/" + id + "/",
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data;
  }
}
