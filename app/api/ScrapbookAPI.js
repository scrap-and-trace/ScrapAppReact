import axios from "axios";

export default class ScrapbookAPI {
  constructor(title, author, friends_only) {
    this.title = title;
    this.author = author;
    this.friends_only = friends_only;
  }

  static async getScrapbooks() {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/scrapbooks/"
    );
    return response.data.results;
  }

  static async getScrapbook(id) {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/scrapbooks/?id=" + id
    );
    return response.data.results[0];
  }

  static async getPages(id) {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/pages/?scrapbook=" + id
    );
    return response.data.results.pages;
  }

  static async createScrapbook(title, author, friends_only) {
    const response = await axios.post(
      "http://94.173.211.21:8000/api/auth/scrapbooks/",
      {
        title: title,
        author: author,
        friends_only: friends_only,
      }
    );
    return response.data;
  }

  static async deleteScrapbook(id) {
    const response = await axios.delete(
      "http://94.173.211.21:8000/api/auth/scrapbooks/" + id
    );
    return response.data;
  }
}
