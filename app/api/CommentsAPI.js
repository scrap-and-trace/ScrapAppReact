/*
 * This is a class that will be used to fetch comment data from the API and create objects from it.
 * Placeholder API Link: https://jsonplaceholder.typicode.com/comments
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

export default class CommentsAPI {
  /**
   * Create a new comment object.
   * @param {number} id - The comment's ID.
   * @param {number} postId - The ID of the post that the comment belongs to.
   * @param {string} name - The name of the user who posted the comment.
   * @param {string} email - The email of the user who posted the comment.
   * @param {string} body - The body of the comment.
   * @throws {Error} - If any of the parameters are invalid.
   * @returns {CommentsAPI} - A comment object.
   */
  constructor(id, postId, name, email, body) {
    this.id = id;
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
  }

  /**
   * Create a new comment object from the JSON data returned from the API.
   * @param {Object} json - The JSON data returned from the API.
   * @returns {CommentsAPI} - A comment object.
   * @throws {Error} - If the JSON data is invalid.
   */
  static fromJson(json) {
    try {
      return new CommentsAPI(
        json.id,
        json.postId,
        json.name,
        json.email,
        json.body
      );
    } catch (error) {
      throw new Error("Invalid JSON data" + error);
    }
  }

  /**
   * Create an array of comment objects from the JSON data returned from the API.
   * @param {Object[]} jsonArray - The JSON data returned from the API.
   * @returns {CommentsAPI[]} - An array of comment objects.
   * @throws {Error} - If the JSON data is invalid.
   */
  static fromJsonArray(jsonArray) {
    try {
      return jsonArray.map(CommentsAPI.fromJson);
    } catch (error) {
      throw new Error("Invalid JSON data" + error);
    }
  }

  /**
   * Get all comments from the API.
   * @returns {CommentsAPI[]} - An array of comment objects.
   * @throws {Error} - If the comment id is invalid.
   */
  static async getComments() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      return CommentsAPI.fromJsonArray(data);
    } catch (error) {
      throw new Error("Invalid comment id" + error);
    }
  }

  /**
   * Get a single comment from the API.
   * @param {number} id - The id of the comment to get.
   * @returns {CommentsAPI} - The comment object.
   * @throws {Error} - If the comment id is invalid.
   */
  static async getComment(id) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments/" + id
      );
      const data = await response.json();
      return CommentsAPI.fromJson(data);
    } catch (error) {
      throw new Error("Invalid comment id" + error);
    }
  }

  /**
   * Get all comments from the API for a specific post.
   * @param {number} postId - The id of the post to get comments for.
   * @returns {CommentsAPI[]} - An array of comment objects.
   * @throws {Error} - If the post id is invalid.
   */
  static async getCommentsByPostId(postId) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?postId=" + postId
      );
      const data = await response.json();
      return CommentsAPI.fromJsonArray(data);
    } catch (error) {
      throw new Error("Invalid post id" + error);
    }
  }

  /**
   * Create a new comment on the API.
   * @param {number} postId - The id of the post to create the comment for.
   * @param {string} name - The name of the user who created the comment.
   * @param {string} email - The email of the user who created the comment.
   * @param {string} body - The body of the comment.
   * @returns {CommentsAPI} - The comment object.
   * @throws {Error} - If the data is invalid.
   */
  static async createComment(postId, name, email, body) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            name: name,
            email: email,
            body: body,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return CommentsAPI.fromJson(data);
    } catch (error) {
      throw new Error("Invalid data: " + error);
    }
  }

  /**
   * Update a comment on the API.
   * @param {number} id - The id of the comment to update.
   * @param {number} postId - The id of the post to update the comment for.
   * @param {string} name - The name of the user who created the comment.
   * @param {string} email - The email of the user who created the comment.
   * @param {string} body - The body of the comment.
   * @returns {CommentsAPI} - The comment object.
   * @throws {Error} - If the data is invalid.
   */
  static async updateComment(id, postId, name, email, body) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments/" + id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: postId,
            name: name,
            email: email,
            body: body,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return CommentsAPI.fromJson(data);
    } catch (error) {
      throw new Error("Invalid data: " + error);
    }
  }

  /**
   * Delete a comment from the API.
   * @param {number} id - The id of the comment to delete.
   * @returns {CommentsAPI} - The comment object.
   * @throws {Error} - If the comment id is invalid.
   */
  static async deleteComment(id) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments/" + id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return CommentsAPI.fromJson(data);
    } catch (error) {
      throw new Error("Invalid comment id" + error);
    }
  }
}
