import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Song } from './song';

const ALBUM_URL = 'https://cors-anywhere.herokuapp.com/http://mp3.zing.vn/json/playlist/get-source/playlist/knJHtLpJFszQVTkFxyFHZn';

@Injectable()
export class MusicService {

  constructor(private http: Http) { }

  getList(): Promise<Array<Song>> {
    return this.http.get(ALBUM_URL).toPromise().then(resp => (resp.json().data as any[]).map(song => ({
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
      return this.http.get(url).map(r => url)
    });
  }
}
