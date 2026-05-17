export interface Session {
  name: string;
  token: string;
  _id: string;
}

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface Playlist {
  _id?: string;
  title: string;
  userid?: string;
  img?: string;
}

export interface Track {
  _id?: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  playlistid?: string;
}