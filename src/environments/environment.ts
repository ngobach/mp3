// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import { Album, SiteConfig, SocialLink } from '../app/site-config';


export const CONFIG: SiteConfig = {
  defaultThumbnail: 'https://graph.facebook.com/134325980235485/picture?width=180&height=180',
  socialLinks: [
    { title: 'Blog', url: 'https://blog.ngobach.com' },
    { title: 'Facebook', url: 'https://fb.me/r4yqu4z4' },
    { title: 'Github', url: 'https://github.com/thanbaiks' },
  ],
  albums: [
    {
      title: 'All',
      id: null,
      color: '#1abc9c'
    },
    {
      title: 'Warsongs',
      id: 'IOZW6DUB',
      color: '#e74c3c'
    }, {
      title: 'Electro',
      id: 'IOZW6DO6',
      color: '#e67e22'
    }, {
      title: 'Light',
      id: 'IOZW6DO7',
      color: '#f1c40f'
    }, {
      title: 'vPOP',
      id: 'IOZW6DO9',
      color: '#3498db'
    }, {
      title: 'Broken',
      id: 'IOZW6DOC',
      color: '#9b59b6'
    }, {
      title: 'US-UK',
      id: 'IOZW6DUW',
      color: '#7f8c8d'
    }, {
      title: 'CJK',
      id: 'IOZW6DOB',
      color: '#27ae60'
    }
  ]
};

export const environment = {
  production: false
};
