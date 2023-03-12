// IP: http://94.173.211.21:8000/api/auth

export default class AccountsAPI {
  static async register(data) {
    const response = await fetch("http://94.173.211.21:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
