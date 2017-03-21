import { Song } from './song';

export interface SocialLink {
  title: string;
  url: string;
}

export interface Album {
  title: string;
  id: string;
  color?: string;
}

export interface SiteConfig {
  defaultThumbnail: string;
  socialLinks: SocialLink[];
  albums: Album[];
  songs?: Promise<Song[]>;
}
