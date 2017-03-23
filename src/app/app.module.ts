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

import { CONFIG as SITE_CONFIG } from '../environments/environment';

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
      provide: 'SiteConfig', useValue: SITE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
