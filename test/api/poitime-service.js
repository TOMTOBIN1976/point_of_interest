import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const poitimeService = {
  poitimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.poitimeUrl}/api/users`, user);
    return res.data;
  }
}