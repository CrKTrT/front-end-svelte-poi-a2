export interface Session {
    name: string;
    _id: string;
    token: string;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id?: string;
  }

  export interface Playlist {
    _id: string;
    title: string;
    userid?: string;
  }
  
  export interface Placemark {
    _id?: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    playlistid?: string;
  }