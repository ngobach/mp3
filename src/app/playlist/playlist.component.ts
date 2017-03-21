import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SlimScrollOptions } from 'ng2-slimscroll';

import { Song } from '../song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  current: Song;

  @Input() list: Song[];
  @Output() itemSelected: EventEmitter<Song> = new EventEmitter();
  @Input() filter: string;

  scrollbarOptions: SlimScrollOptions = {
    gridMargin: '0',
    gridBackground: 'rgba(0, 0, 0, .2)',

    barBackground: '#e74c3c',
    barWidth: '8',
  };

  constructor() {
    this.list = [];
  }

  ngOnInit() {
  }

}
