import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Song } from '../song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  filter: string;
  current: Song;

  @Input() list: Song[];
  @Output() itemSelected: EventEmitter<Song> = new EventEmitter();

  constructor() {
    this.list = [];
  }

  ngOnInit() {
  }

}
