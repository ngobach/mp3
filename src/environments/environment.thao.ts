import { Album, SiteConfig, SocialLink } from '../app/site-config';

export const CONFIG: SiteConfig = {
  defaultThumbnail: 'https://aos.iacpublishinglabs.com/question/aq/1400px-788px/can-cats-smile_83838103755e4c17.jpg?domain=cx.aos.ask.com',
  socialLinks: [
    { title: 'Facebook', url: 'https://www.facebook.com/thao.trang.520900' }
  ],
  albums: [
    {
      title: 'Toàn bộ',
      id: null,
      color: '#1abc9c'
    },
    {
      title: 'Không lời',
      id: 'ZHJmykhdApHZFykFxyFGkm',
      color: '#e74c3c'
    },
    {
      title: 'US-UK',
      id: 'LHcnykXdlQcsLyZDJyDGZm',
      color: '#e67e22'
    },
    {
      title: 'Thao',
      id: 'LnxGTLhBlQubNtLbxyFHLn',
      color: '#2980b9'
    },
  ]
};

export const environment = {
  production: true
};
