import axios from "axios";
import type { Playlist, Placemark, Session, User } from "$lib/types/playtime-types";
//import type { Candidate, Donation } from "$lib/types/donation-types";
//import { currentDonations, currentCandidates, loggedInUser } from "$lib/runes.svelte";
import { currentPlaylists, currentPlacemarks, loggedInUser } from "$lib/runes.svelte";

export const donationService = {
  baseUrl: "http://localhost:3000", // Changed port same as the backend URL

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {
        email,
        password
      });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshAppData();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.playtime = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.playtime;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshAppData();
  },

  clearSession() {
    currentPlaylists.playlists = [];
    currentPlacemarks.placemarks = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("playtime");
  },

  async refreshAppData() {
    if (loggedInUser.token) {
      currentPlaylists.playlists = await this.getPlaylists(loggedInUser.token);
      currentPlacemarks.placemarks = await this.getPlacemarks(loggedInUser.token);
    }
  },

  disconnect() {
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("playtime");
  },

  async addPlacemark(playlistId: string, placemark: Placemark, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(
      this.baseUrl + "/api/playlists/" + playlistId + "/tracks",
      placemark
    );

    await this.refreshAppData();

    return response.status == 200;
  } catch (error) {
    console.log(error);
    return false;
  }
  },

  async getPlaylists(token: string): Promise<Playlist[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/playlists");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getPlacemarks(token: string): Promise<Placemark[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/tracks");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};
