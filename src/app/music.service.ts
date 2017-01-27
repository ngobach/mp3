import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

import { SiteConfig } from './site-config';
import { Song } from './song';

const ALBUM_URL_PREFIX = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/knJHtLpJFszQVTkFxyFHZn';

@Injectable()
export class MusicService {

  constructor(private http: Http, @Inject('SiteConfig') private siteConfig: SiteConfig) { }

  getList(): Promise<Array<Song>> {
    return this.http.get(ALBUM_URL_PREFIX + this.siteConfig.albumId).toPromise().then(resp => (resp.json().data as any[]).map(song => ({
      name: song.name,
      artist: song.artist,
      source: song.source_list[0],
      cover: song.cover,
      zmp3Id: song.id
    })));
  }

  getThumbnail(id: string): Observable<string> {
    return Observable.of(id).switchMap(id => {
      return this.http.get('https://cors-anywhere.herokuapp.com/http://m.mp3.zing.vn/bai-hat/Nothing/' + id + '.html');
    })
    .switchMap(r => {
      const re = /url\(\'(.+?)\'\)/;
      const url = r.text().match(re)[1];
      const img = new Image();
      img.src = url;
      return new Promise((res, rej) => {
        img.onload = () => res(url);
        img.onerror = rej;
      });
    });
  }
}
