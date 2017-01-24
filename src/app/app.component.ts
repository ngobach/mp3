import { Component, OnInit, trigger, state, style, transition, animate, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MusicService } from './music.service';
import { Song } from './song';

declare const $: any;

const THUMBNAIL_URL = 'https://graph.facebook.com/134325980235485/picture?width=180&height=180';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(.8)'
        }),
        animate('300ms ease-out', style({
          opacity: 1,
          transform: 'scale(1)'
        })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate('300ms ease-out', style({
          opacity: 0,
          transform: 'scale(.8)'
        })),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  private thumbnailUrl = THUMBNAIL_URL;
  private audio: HTMLAudioElement;
  private songs: Song[];
  private current: Song;
  private currentProgress: number = 0;
  private playlistMode = false;
  private timeLeft = '00:00';
  private timeRemain = '00:00';

  constructor(private title: Title, private musicService: MusicService, private er: ElementRef) {}

  private get loaded(): boolean {
    return this.songs != null;
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
    this.musicService.getList()
      .then(data => this.songs = data)
      .then(() => this.play(this.songs[Math.trunc(Math.random() * this.songs.length)]))
      .then(() => setTimeout(() => this.initSlider(), 1));
    $(document).on('keyup', ev => {
      if (ev.keyCode === 27) {
        this.playlistMode = false;
      }
    });
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
        slide: (ev, ui) => this.audio.volume = 1 - ui.value / 100
    });
  }

  play(song: Song) {
    this.current = song;
    this.audio.src = song.source;
    this.audio.play();
    this.title.setTitle(song.artist + ' - ' + song.name);
    setTimeout(() => this.updateTime(), 1);
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
