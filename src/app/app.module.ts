import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SlimScrollModule } from 'ng2-slimscroll';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MusicService } from './music.service';
import { AssetsService } from './assets.service';
import { StrLimitPipe } from './str-limit.pipe';
import { SiteConfig } from './site-config';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SongFilterPipe } from './song-filter.pipe';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AlbumFilterPipe } from './album-filter.pipe';

const CONFIG: SiteConfig = {
  defaultThumbnail: 'https://graph.facebook.com/134325980235485/picture?width=180&height=180',
  socialLinks: [
    { title: 'Blog', url: 'https://blog.ngobach.com' },
    { title: 'Facebook', url: 'https://fb.me/r4yqu4z4' },
    { title: 'Github', url: 'https://github.com/thanbaiks' },
  ],
  albums: [
    {
      title: 'All',
      id: null,
      color: '#1abc9c'
    },
    {
      title: 'Warsongs',
      id: 'ZHcHtLhBFWxBQtZFJtbmLG',
      color: '#e74c3c'
    }, {
      title: 'Electro',
      id: 'kGxmtLXdFWxLlyLbxyDHLm',
      color: '#e67e22'
    }, {
      title: 'Light',
      id: 'ZHJntZgBvQcZQtkbxyvmZm',
      color: '#f1c40f'
    }, {
      title: 'vPOP',
      id: 'LmcHyLgVFQcLsyLFcTbGLH',
      color: '#3498db'
    }, {
      title: 'Broken',
      id: 'ZmJnykhdFQxvGyLbJtFmLG',
      color: '#9b59b6'
    }, {
      title: 'US-UK',
      id: 'LncGykgBFpJDhtZbcyFmLG',
      color: '#7f8c8d'
    }, {
      title: 'CJK',
      id: 'LncmyLhVbpcZRtLFxybHLm',
      color: '#27ae60'
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    StrLimitPipe,
    PlayerComponent,
    PlaylistComponent,
    SongFilterPipe,
    ToolbarComponent,
    AlbumFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    SlimScrollModule
  ],
  providers: [
    MusicService,
    AssetsService,
    {
      provide: 'SiteConfig', useValue: CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
