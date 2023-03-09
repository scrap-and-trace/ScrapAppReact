/*
 * This file contains the API for getting posts from the server and posting new posts to the server using the Django REST Framework.
 * Placeholder API Link: https://jsonplaceholder.typicode.com/posts
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

class PostAPI {
  constructor(id, title, body, image, author) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.image = image;
    this.author = author;
  }

  static fromJson(json) {
    return new PostAPI(json.id, json.title, json.body);
  }

  static fromJsonArray(jsonArray) {
    return jsonArray.map(PostAPI.fromJson);
  }

  static async getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return PostAPI.fromJsonArray(data);
  }
}

export default PostAPI;
