import { Component, OnInit, trigger, state, style, transition, animate, ElementRef, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MusicService } from './music.service';
import { Song } from './song';
import { SiteConfig } from './site-config';
import { SlimScrollOptions } from 'ng2-slimscroll';

declare const $: any;

const ASSESTS_IMAGES: string[] = [
  'loop.png',
  'loop_.png',
  'next.png',
  'pause.png',
  'play.png',
  'playlist.png',
  'prev.png',
  'shuffle.png',
  'shuffle_.png',
  'volume.png',
  'volume_.png',
  'facebook.png'
];

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
  private thumbnailUrl: string = '';
  private audio: HTMLAudioElement;
  private songs: Song[];
  private current: Song;
  private currentProgress: number = 0;
  private playlistMode = false;
  private timeLeft = '00:00';
  private timeRemain = '00:00';
  private assetsLoaded = false;
  private subThumbnail: Subject<string>;
  private scrollbarOptions: SlimScrollOptions = {
    gridMargin: '0',
    gridBackground: 'rgba(0, 0, 0, .2)',

    barBackground: '#e74c3c',
    barWidth: '8',
  };

  constructor(
      private title: Title,
      private musicService: MusicService,
      private er: ElementRef,
      @Inject('SiteConfig') private siteConfig: SiteConfig) {
    ASSESTS_IMAGES.push(siteConfig.defaultThumbnail);
    this.thumbnailUrl = siteConfig.defaultThumbnail;
  }

  private get loaded(): boolean {
    return this.songs != null && this.assetsLoaded;
  }

  private get name(): string {
    return this.current == null ? '' : this.current.name;
  }

  private get artist(): string {
    return this.current == null ? '' : this.current.artist;
  }

  private get loop(): boolean {
    return this.audio == null || this.audio.loop === true;
  }

  private set loop(val: boolean) {
    if (this.audio != null) {
      this.audio.loop = val;
    }
  }

  ngOnInit() {
    const audio = this.audio = window['bach'] = new Audio();
    audio.autoplay = true;
    audio.loop = true;
    audio.addEventListener('timeupdate', () => this.updateTime());
    audio.addEventListener('ended', () => {
      const cur = this.songs.indexOf(this.current)
      let next: number;
      do {
        next = Math.trunc(Math.random() * this.songs.length);
      } while (next === cur);
      this.play(this.songs[next]);
    });

    this.title.setTitle('Ngô Xuân Bách');

    // Subject thumbnail
    this.subThumbnail = new Subject();
    this.subThumbnail
      .switchMap(id => this.musicService.getThumbnail(id)
      .catch(() => {
        return Observable.of(this.siteConfig.defaultThumbnail);
      }))
      .subscribe(url => this.thumbnailUrl = url);

    // Load playlist from zmp3
    this.musicService.getList()
      .then(data => this.songs = data)
      .then(() => this.play(this.songs[Math.trunc(Math.random() * this.songs.length)]))
      .then(() => setTimeout(() => this.initSlider(), 100));

    // Load image assets
    Promise.all(ASSESTS_IMAGES.map(file => new Promise((res, rej) => {
      const img = new Image();
      if (file.startsWith('http')) {
        img.src = file;
      } else {
        img.src = '/assets/' + file;
      }
      img.onload = res;
      img.onerror = rej;
    }))).then(() => this.assetsLoaded = true);

    $(document).on('keyup', ev => {
      if (ev.keyCode === 27) {
        this.playlistMode = !this.playlistMode;
      } else if (ev.keyCode === 32) {
        if (!isNaN(this.audio.duration)) {
          if (this.audio.paused) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }
      }
    });

    $(document).on('mouseup', e => {
      if (e.button === 2 && this.loaded) {
        e.preventDefault();
        this.playlistMode = !this.playlistMode;
      }
    });
    $(document).on('contextmenu', () => false);
  }

  initSlider() {
    const $root = $(this.er.nativeElement);
    const height = $root.find('.slider')[0].offsetHeight;
    $root.find('.slider').css('flex', 'none').css('height', height + 'px');
    $root.find('.slider').slider({
        value: (1 - this.audio.volume) * 100,
        range: 'max',
        max: 100,
        animate: true,
        orientation: 'vertical',
        slide: (ev, ui) => {
          this.audio.volume = 1 - ui.value / 100;
          this.audio.muted = false;
        }
    });
  }

  play(song: Song) {
    this.current = song;
    this.audio.src = song.source;
    this.audio.play();
    this.title.setTitle(song.artist + ' - ' + song.name);
    setTimeout(() => this.updateTime(), 1);
    this.subThumbnail.next(song.zmp3Id);
  }

  fmat(x: number): string {
    x = Math.trunc(x);
    if (x < 10) {
      return '0' + x;
    }
    return '' + x;
  }

  updateTime(): void {
    let current = 0, remain = 0;
    this.currentProgress = 0;
    if (!Number.isNaN(this.audio.duration)) {
      current = Math.trunc(this.audio.currentTime);
      remain = Math.trunc(this.audio.duration) - current;
      this.currentProgress = this.audio.currentTime / this.audio.duration * 100;
    }
    this.timeLeft = this.fmat(current / 60)  + ':' + this.fmat(current % 60);
    this.timeRemain = this.fmat(remain / 60) + ':' + this.fmat(remain % 60);
  }

  togglePlayState() {
    if (this.audio != null && !isNaN(this.audio.duration)) {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
  }

  next(x = 1): void {
    let cur = this.songs.indexOf(this.current) + x;
    cur = (cur + this.songs.length) % this.songs.length;
    this.play(this.songs[cur]);
  }

  seek(e: any): void {
    const wid: number = e.target.offsetWidth;
    const x: number = e.offsetX;
    if (this.audio != null && !isNaN(this.audio.duration)) {
      const newTime = x / wid * this.audio.duration;
      this.audio.currentTime = newTime;
    }
  }
}
