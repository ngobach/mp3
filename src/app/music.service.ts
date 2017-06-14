import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

import { SiteConfig } from './site-config';
import { Song } from './song';
import * as _ from 'lodash';

@Injectable()
export class MusicService {
  /**
   * Cache for song's thumbnail url
   */
  private _cache: Map<string, string>;
  private _allSongs: Promise<Song[]>;

  constructor(private http: Http, @Inject('SiteConfig') private siteConfig: SiteConfig) {
    this._cache = new Map();
  }

  corsGet(url: string, retries = 5) {
    return this.http.get(url).toPromise().catch(err => {
      if (retries) {
        return this.corsGet(url, retries - 1);
      } else {
        return Promise.reject(err);
      }
    });
  }

  loadPlaylists(): Promise<Song[]> {
    if (this._allSongs != null) {
      return this._allSongs;
    }

    return this._allSongs = Promise.all(this.siteConfig.albums.filter(album => album.id).map(album => {
      return this.corsGet('http://api.ngobach.com/' + album.id)
        .then(resp => (resp.json() as any[]).map(song => ({
          name: song.title,
          artist: song.artist,
          source: song.source,
          cover: song.cover,
          zmp3Id: song.id,
          albums: [album]
        })));
    })).then((x: Song[][]) => {
      const map: Map<string, Song> = new Map();
      x.forEach((songs: Song[]) => {
        songs.forEach((s: Song) => {
          if (map.has(s.zmp3Id)) {
            map.get(s.zmp3Id).albums.push(s.albums[0]);
          } else {
            map.set(s.zmp3Id, s);
          }
        });
      });
      return _.shuffle(Array.from(map.values()));
    });
  }

  getThumbnail(url: string): Promise<null> {
    const img = new Image();
    img.src = url;
    return new Promise((res, rej) => {
      img.onload = () => res();
      img.onerror = rej;
    });
  }
}
