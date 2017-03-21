import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { SiteConfig, SocialLink } from '../site-config';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() filter: string;
  @Output() filterChange: EventEmitter<string> = new EventEmitter();
  @Input() searchError: boolean;

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
  }

  ngOnInit() {
  }

}
