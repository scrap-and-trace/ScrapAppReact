/*
 * This file contains the API for the scrapbook model.
 * It contains functions to get, create, and delete scrapbooks.
 * API Link: http://94.173.211.21:8000/api/auth/scrapbooks/
 *
 * Author: Kieran Gordon <kjg2000@hw.ac.uk>
 */

import axios from "axios";

export default class ScrapbookAPI {
  constructor(id, title, username, pages, date_created, author, friends_only) {
    this.id = id;
    this.title = title;
    this.username = username;
    this.pages = pages;
    this.date_created = date_created;
    this.author = author;
    this.friends_only = friends_only;
  }

  static async getScrapbooks() {
    const response = await axios.get(
      "http://94.173.211.21:8000/api/auth/scrapbooks/"
    );
    return response.data.map(
      (scrapbook) =>
        new ScrapbookAPI(
          scrapbook.id,
          scrapbook.title,
          scrapbook.username,
          scrapbook.pages,
          scrapbook.date_created,
          scrapbook.author,
          scrapbook.friends_only
        )
    );
  }

  static async createScrapbook(title, friends_only) {
    const response = await axios.post(
      "http://94.173.211.21:8000/api/auth/scrapbooks/",
      {
        title: title,
        friends_only: friends_only,
      }
    );
    return response.data;
  }
}
