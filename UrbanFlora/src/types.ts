export interface User {
  uid?: string;
  name: string;
  email: string;
}

export interface Uploader {
  name: string;
  username: string;
  avatar: string;
  level: string;
  followed: boolean;
}

export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  lat?: number;
  lng?: number;
  rarity: number;
  category: string;
  scope?: 'local' | 'turkey' | 'global';
  distance?: string;
  date?: string;
  image: string;
  desc: string;
  habitat?: string;
  features?: string;
  uploader?: Uploader;
}

export type ActiveScreen =
  | 'home'
  | 'map'
  | 'search'
  | 'identify'
  | 'profile'
  | 'notifications'
  | 'daily_discoveries'
  | 'auth';
