import PostAPI from "./PostAPI";
import axios from "axios";

export default class ScrapbookAPI {
  constructor(id, title, author, email, pages, postIds, image) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.email = email;
    this.pages = pages;
    this.postIds = postIds;
    this.image = image;
  }

  static fromJson(json) {
    try {
      return new ScrapbookAPI(
        json.id,
        json.title,
        json.author,
        json.email,
        json.pages,
        json.postIds,
        json.image
      );
    } catch (error) {
      throw new Error("Invalid JSON data" + error);
    }
  }

  static fromJsonArray(jsonArray) {
    return jsonArray.map(ScrapbookAPI.fromJson);
  }

  static async getScrapbooks() {
    try {
      let response = await fetch("http://localhost:3000/scrapbooks");
      let responseJson = await response.json();
      return ScrapbookAPI.fromJsonArray(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  static async getScrapbook(id) {
    try {
      let response = await fetch("http://localhost:3000/scrapbooks/" + id);
      let responseJson = await response.json();
      return ScrapbookAPI.fromJson(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  static async getScrapbookPosts(id) {
    try {
      let response = await fetch(
        "http://localhost:3000/scrapbooks/" + id + "/posts"
      );
      let responseJson = await response.json();
      return responseJson.map((post) => PostAPI.fromJson(post));
    } catch (error) {
      console.error(error);
    }
  }

  static async createScrapbook(scrapbook) {
    try {
      let response = await fetch("http://localhost:3000/scrapbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scrapbook),
      });
      let responseJson = await response.json();
      return ScrapbookAPI.fromJson(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateScrapbook(scrapbook) {
    try {
      let response = await fetch(
        "http://localhost:3000/scrapbooks/" + scrapbook.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(scrapbook),
        }
      );
      let responseJson = await response.json();
      return ScrapbookAPI.fromJson(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteScrapbook(id) {
    try {
      let response = await fetch("http://localhost:3000/scrapbooks/" + id, {
        method: "DELETE",
      });
      let responseJson = await response.json();
      return ScrapbookAPI.fromJson(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  static async addPostToScrapbook(scrapbookId, postId) {
    try {
      let response = await fetch(
        "http://localhost:3000/scrapbooks/" + scrapbookId + "/posts/" + postId,
        {
          method: "POST",
        }
      );
      let responseJson = await response.json();
      return ScrapbookAPI.fromJson(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  static async removePostFromScrapbook(scrapbookId, postId) {
    try {
      let response = await fetch(
        "http://localhost:3000/scrapbooks/" + scrapbookId + "/posts/" + postId,
        {
          method: "DELETE",
        }
      );
      let responseJson = await response.json();
      return ScrapbookAPI.fromJson(responseJson);
    } catch (error) {
      console.error(error);
    }
  }
}
