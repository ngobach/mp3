import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

import { SiteConfig } from './site-config';
import { Song } from './song';
import * as _ from 'lodash';

const URL_RESOLVER =
  id => 'http://api.mp3.zing.vn/api/mobile/playlist/getsonglist?requestdata={%22id%22:%22' + id + '%22, %22length%22: 1000}&fromvn=true';

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
    return this.http.get('http://cors-anywhere.herokuapp.com/' + url).toPromise().catch(err => {
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
      return this.corsGet(URL_RESOLVER(album.id))
        .then(resp => (resp.json().docs as any[]).map(song => ({
          name: song.title,
          artist: song.artist,
          source: song.source['128'],
          cover: song.thumbnail ? 'http://image.mp3.zdn.vn/' + song.thumbnail : null,
          zmp3Id: song.song_id,
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
