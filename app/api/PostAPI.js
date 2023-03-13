/*
 * This file contains the API for getting posts from the server and posting new posts to the server using the Django REST Framework.
 * Placeholder API Link: https://jsonplaceholder.typicode.com/posts
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import AccountsAPI from "./AccountsAPI";

export default class PostAPI {
  /**
   * Create a new post object.
   * @param {number} id - The post's ID.
   * @param {string} title - The title of the post.
   * @param {string} body - The body of the post.
   * @param {string} image - The image of the post.
   * @param {string} author - The author of the post.
   * @param {string} email - The email of the author of the post. Acts as a unique identifier.
   * @param {number} scrapbookId - The ID of the scrapbook that the post belongs to.
   * @param {number} latitude - The latitude of the post.
   * @param {number} longitude - The longitude of the post.
   */
  constructor(
    id,
    title,
    body,
    image,
    author,
    email,
    scrapbookId,
    latitude,
    longitude
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.image = image;
    this.author = author;
    this.email = email;
    this.scrapbookId = scrapbookId;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Create a new post object from the JSON data returned from the API.
   * @param {Object} json - The JSON data returned from the API.
   * @returns {PostAPI} - A post object.
   * @throws {Error} - If the JSON data is invalid.
   */
  static fromJson(json) {
    try {
      return new PostAPI(
        json.id,
        json.title,
        json.body,
        json.image,
        json.author,
        json.email,
        json.scrapbookId,
        json.latitude,
        json.longitude
      );
    } catch (error) {
      throw new Error("Invalid JSON data" + error);
    }
  }

  /**
   * Create an array of post objects from the JSON data returned from the API.
   * @param {Object[]} jsonArray - The JSON data returned from the API.
   * @returns {PostAPI[]} - An array of post objects.
   * @throws {Error} - If the JSON data is invalid.
   */
  static fromJsonArray(jsonArray) {
    return jsonArray.map(PostAPI.fromJson);
  }

  /**
   * Get all posts from the API.
   * @returns {PostAPI[]} - An array of post objects.
   * @throws {Error} - If the API returns an error.
   */
  static async getPosts() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      return PostAPI.fromJsonArray(data);
    } catch (error) {
      throw new Error("Error getting posts from API" + error);
    }
  }

  /**
   * Get a post from the API.
   * @param {number} id - The ID of the post to get.
   * @returns {PostAPI} - A post object.
   * @throws {Error} - If the API returns an error.
   */
  static async getPost(id) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + id
      );
      const data = await response.json();
      return PostAPI.fromJson(data);
    } catch (error) {
      throw new Error("Error getting post from API" + error);
    }
  }

  /**
   * Create a new post on the API.
   * @param {string} title - The title of the post.
   * @param {string} body - The body of the post.
   * @param {string} image - The image of the post.
   * @param {string} author - The author of the post.
   * @param {string} email - The email of the author of the post. Acts as a unique identifier.
   * @param {number} scrapbookId - The ID of the scrapbook that the post belongs to.
   * @param {number} latitude - The latitude of the post.
   * @param {number} longitude - The longitude of the post.
   * @returns {PostAPI} - A post object.
   * @throws {Error} - If the API returns an error.
   */
  static async createPost(
    title,
    body,
    image,
    author,
    email,
    scrapbookId,
    latitude,
    longitude
  ) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
            image: image,
            author: author,
            email: email,
            scrapbookId: scrapbookId,
            latitude: latitude,
            longitude: longitude,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return PostAPI.fromJson(data);
    } catch (error) {
      throw new Error("Error creating post on API" + error);
    }
  }

  /**
   * Delete a post from the API.
   * @param {number} id - The ID of the post to delete.
   * @returns {PostAPI} - A post object.
   * @throws {Error} - If the API returns an error.
   */
  static async deletePost(id) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      return PostAPI.fromJson(data);
    } catch (error) {
      throw new Error("Error deleting post on API" + error);
    }
  }

  /**
   * Update a post on the API.
   * @param {number} id - The ID of the post to update.
   * @param {string} title - The title of the post.
   * @param {string} body - The body of the post.
   * @param {string} image - The image of the post.
   * @param {string} author - The author of the post.
   * @param {string} email - The email of the author of the post. Acts as a unique identifier.
   * @param {number} scrapbookId - The ID of the scrapbook that the post belongs to.
   * @param {number} latitude - The latitude of the post.
   * @param {number} longitude - The longitude of the post.
   * @returns {PostAPI} - A post object.
   * @throws {Error} - If the API returns an error.
   */
  static async putPost(
    id,
    title,
    body,
    image,
    author,
    email,
    scrapbookId,
    latitude,
    longitude
  ) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
            image: image,
            author: author,
            email: email,
            scrapbookId: scrapbookId,
            latitude: latitude,
            longitude: longitude,
          }),
        }
      );
      const data = await response.json();
      return PostAPI.fromJson(data);
    } catch (error) {
      throw new Error("Error updating post on API" + error);
    }
  }

  /**
   * Update a post on the API.
   * @param {number} id - The ID of the post to update.
   * @param {string} title - The title of the post.
   * @param {string} body - The body of the post.
   * @param {string} image - The image of the post.
   * @param {string} author - The author of the post.
   * @param {string} email - The email of the author of the post. Acts as a unique identifier.
   * @param {number} scrapbookId - The ID of the scrapbook that the post belongs to.
   * @param {number} latitude - The latitude of the post.
   * @param {number} longitude - The longitude of the post.
   * @returns {PostAPI} - A post object.
   * @throws {Error} - If the API returns an error.
   */
  static async patchPost(
    id,
    title,
    body,
    image,
    author,
    email,
    scrapbookId,
    latitude,
    longitude
  ) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
            image: image,
            author: author,
            email: email,
            scrapbookId: scrapbookId,
            latitude: latitude,
            longitude: longitude,
          }),
        }
      );
      const data = await response.json();
      return PostAPI.fromJson(data);
    } catch (error) {
      throw new Error("Error updating post on API" + error);
    }
  }

  /**
   * Get all posts from the API that belong to a scrapbook.
   * @param {number} scrapbookId - The ID of the scrapbook to get posts from.
   * @returns {PostAPI[]} - An array of post objects.
   * @throws {Error} - If the API returns an error.
   */
  static async getPostsByScrapbookId(scrapbookId) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?scrapbookId=" + scrapbookId
      );
      const data = await response.json();
      return PostAPI.fromJsonArray(data);
    } catch (error) {
      throw new Error("Error getting posts from API" + error);
    }
  }
}
