import axios from "axios";

export default class PageAPI {
  constructor(id, title, body, scrapbook, longitude, latitude) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.scrapbook = scrapbook;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  static async getPages() {
    const response = await axios.get("http://94.173.211.21:8000/page/");
    return response.data.results;
  }

  static async getPage(id) {
    const response = await axios.get(
      "http://94.173.211.21:8000/page/?id=" + id
    );
    return response.data.results[0];
  }

  static async getComments(id) {
    const response = await axios.get(
      "http://94.173.211.21:8000/page/?id=" + id
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
    const response = await axios.post("http://94.173.211.21:8000/page/", {
      title,
      body,
      scrapbook,
      image_url,
      delete_url,
      longitude,
      latitude,
    });
    return response.data;
  }

  static async createComment(authorid, page, body) {
    const response = await axios.post("http://94.173.211.21:8000/comment/", {
      authorid,
      page,
      body,
    });
    return response.data;
  }
}
