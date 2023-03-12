// IP: http://192.168.0.20:8000/api/auth/

export default class AccountsAPI {
  static async register(data) {
    const response = await fetch("http://192.168.0.20:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
