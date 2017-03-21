import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/core';

import { SiteConfig, SocialLink, Album } from '../site-config';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-out')
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateY(-100%)' })),
      ]),
    ])
  ]
})
export class ToolbarComponent implements OnInit {

  @Input() filter: string;
  @Output() filterChange: EventEmitter<string> = new EventEmitter();
  @Input() searchError: boolean;
  @Output() albumSelected: EventEmitter<Album> = new EventEmitter();

  albums: Album[];
  selected: Album;
  open: boolean;

  get value() {
    return this.filter;
  }
  set value(x: string) {
    this.filter = x;
    this.filterChange.emit(x);
  }
  socialLinks: SocialLink[];

  constructor( @Inject('SiteConfig') sc: SiteConfig) {
    this.socialLinks = sc.socialLinks;
    this.albums = sc.albums.slice();
    this.selected = this.albums[0];
    this.open = false;
  }

  ngOnInit() {
  }

  select(item: Album) {
    this.selected = item;
    this.albumSelected.emit(item);
  }
}
