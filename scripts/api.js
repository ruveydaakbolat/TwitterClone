const options = {
  headers: {
    "X-RapidAPI-Key": "b9c62e627amsh1f711f5429861eep17f6dejsnabd624c5e57e",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};

export class API {
  static async getUser(username) {
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
      options
    );
    const data = await res.json();
    return data;
  }

  static async fetchData(endpoint) {
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com${endpoint}`,
      options
    );

    return await res.json();
  }
}
