import axios from "axios";

export default class LikesAPI {
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

  static async getLikeById(id) {
    const response = await axios.get(
      `http://94.173.211.21:8000/api/auth/likes/${id}`
    );
    return response.data;
  }

  static async deleteLike(id) {
    const response = await axios.delete(
      `http://94.173.211.21:8000/api/auth/deletelike/${id}`
    );
    return response.data;
  }
}
