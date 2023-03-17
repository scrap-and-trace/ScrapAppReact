import axios from "axios";

export default class LieksAPI {
  constructor(id, title, likes, scrapbook, ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.scrapbook = scrapbook;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  static async getLikes() {
    const response = await axios.get("http://94.173.211.21:8000/page/");
    return response.data.results;
  }


  static async sendLike(authorid, page, body) {
    const response = await axios.post("http://94.173.211.21:8000/comment/", {
      pageID,
      UserID,

    });
    return response.data;
  }

  static async sendUnlike(authorid, page, body) {
    const response = await axios.post("http://94.173.211.21:8000/comment/", {
      PageID,
      UserID,
    });
    return response.data;
  }
}
