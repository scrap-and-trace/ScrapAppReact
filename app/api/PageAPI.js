import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default class PageAPI {
  constructor(id, title, body, scrapbook, longitude, latitude) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.scrapbook = scrapbook;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  static async getToken() {
    return await SecureStore.getItemAsync("token");
  }

  static async getPages() {
    const response = await axios.get("http://51.104.46.39:8000/page/", {
      headers: {
        Authorization: "Token " + (await this.getToken()),
      },
    });
    return response.data.results;
  }

  static async getPage(id) {
    const response = await axios.get(
      "http://51.104.46.39:8000/page/?id=" + id,
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data.results[0];
  }

  static async getComments(id) {
    const response = await axios.get(
      "http://51.104.46.39:8000/page/?id=" + id,
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data.results[0].comments;
  }

  static async createPage(
    title,
    body,
    scrapbook,
    image_url,
    delete_url,
    longitude,
    latitude
  ) {
    const response = await axios.post(
      "http://51.104.46.39:8000/page/",
      {
        title,
        body,
        scrapbook,
        image_url,
        delete_url,
        longitude,
        latitude,
      },
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data;
  }

  static async deletePage(id) {
    const response = await axios.delete(
      "http://51.104.46.39:8000/page/" + id + "/",
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data;
  }

  static async createComment(authorid, page, body) {
    const response = await axios.post(
      "http://51.104.46.39:8000/comment/",
      {
        authorid,
        page,
        body,
      },
      {
        headers: {
          Authorization: "Token " + (await this.getToken()),
        },
      }
    );
    return response.data;
  }

  static async createLike(userId, pageId) {
    const response = await axios.post(
      `http://51.104.46.39:8000/api/auth/likes/${pageId}/`,
      {
        liker: userId,
        liked_page: pageId,
      },
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async deleteLike(pageId) {
    const response = await axios.delete(
      `http://51.104.46.39:8000/api/auth/deletelike/${pageId}/`,
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data;
  }

  static async getLikeById(id) {
    const response = await axios.get(
      `http://51.104.46.39:8000/api/auth/likes/${id}`,
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
      `http://51.104.46.39:8000/api/auth/userlikes/${userId}`,
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data.results[0];
  }

  static async getLikesByPage(pageId) {
    const response = await axios.get(
      `http://51.104.46.39:8000/api/auth/likes/${pageId}`,
      {
        headers: {
          Authorization: `Token ${await this.getToken()}`,
        },
      }
    );
    return response.data.results.length;
  }
}
