import { Component, OnInit, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

import { AssetsService } from './assets.service';
import { MusicService } from './music.service';
import { Song } from './song';
import { SlimScrollOptions } from 'ng2-slimscroll';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { Album } from './site-config';
import { AlbumFilterPipe } from './album-filter.pipe';

import * as _ from 'lodash';

declare const $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('out', style({
        display: 'none'
      })),
      transition(':enter, out => *', [
        style({
          opacity: 0,
          transform: 'scale(1.2)'
        }),
        animate('300ms ease-out', style({
          opacity: 1,
          transform: 'scale(1)'
        })),
      ]),
      transition(':leave, * => out', [
        style({
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate('300ms ease-out', style({
          opacity: 0,
          transform: 'scale(1.2)'
        })),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  private songs: Song[];
  private current: Subject<Song>;
  private assetsLoaded = false;
  @ViewChild(PlayerComponent)
  private player: PlayerComponent;
  @ViewChild(PlaylistComponent)
  private playlist: PlaylistComponent;
  album: Album;
  albumFilter: AlbumFilterPipe;
  filter: string;
  private scrollbarOptions: SlimScrollOptions = {
    gridMargin: '0',
    gridBackground: 'rgba(0, 0, 0, .2)',

    barBackground: '#e74c3c',
    barWidth: '8',
  };

  constructor(
    private title: Title,
    private assetsService: AssetsService,
    private musicService: MusicService
  ) {
    this.albumFilter = new AlbumFilterPipe();
  }

  private get loaded(): boolean {
    return this.songs != null && this.assetsLoaded;
  }

  ngOnInit() {
    // Variable initialize
    this.current = new Subject();
    this.current.subscribe((song) => {
      if (song != null) {
        this.title.setTitle(song.artist + ' - ' + song.name);
        this.player.play(song);
        this.playlist.current = song;
      }
    });
    // Load playlist from zmp3
    this.musicService.loadPlaylists()
      .then(songs => {
        this.songs = songs;
        this.current.next(_.sample(this.songs));
      });
    // Load assets
    this.assetsService.load().then(() => this.assetsLoaded = true);

    this.player.nextSong.subscribe((i: number) => {
      const songs = this.albumFilter.transform(this.songs, this.album);
      if (i === 0) {
        this.current.next(_.sample(songs));
      } else {
        const current = songs.indexOf(this.player.current);
        if (current >= 0) {
          i = (current + i + songs.length) % songs.length;
          this.current.next(songs[i]);
        } else {
          this.current.next(_.sample(songs));
        }
      }
    });

    $(document).on('keyup', ev => {
      if (ev.keyCode === 32) {
        this.player.togglePlayState();
      }
    });

    $(document).on('contextmenu', () => false);
  }
}
