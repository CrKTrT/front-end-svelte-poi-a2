import type { Playlist, Placemark } from "./types/playtime-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
  email: "",
  name: "",
  token: "",
  _id: ""
});
export const currentPlaylists = $state({ playlists: [] as Playlist[] });
export const currentPlacemarks = $state({ placemarks: [] as Placemark[] });
