
export interface SocialLink {
  title: string;
  url: string;
}

export interface SiteConfig {
    albumId: string;
    defaultThumbnail: string;
    socialLinks: SocialLink[];
}
