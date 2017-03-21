import { Injectable, Inject } from '@angular/core';
import { SiteConfig } from './site-config';

const ASSESTS_IMAGES: string[] = [
  'loop.png',
  'loop_.png',
  'next.png',
  'pause.png',
  'play.png',
  'prev.png',
  'shuffle.png',
  'shuffle_.png',
  'volume.png',
  'volume_.png',
  'facebook.png'
];

@Injectable()
export class AssetsService {

  constructor(@Inject('SiteConfig') siteConfig: SiteConfig) {
    ASSESTS_IMAGES.push(siteConfig.defaultThumbnail);
  }

  public load(): Promise<any> {
    return Promise.all(ASSESTS_IMAGES.map(file => new Promise((res, rej) => {
      const img = new Image();
      if (file.startsWith('http')) {
        img.src = file;
      } else {
        img.src = '/assets/' + file;
      }
      img.onload = res;
      img.onerror = rej;
    })));
  }
}
