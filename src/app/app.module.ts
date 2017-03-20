import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SlimScrollModule } from 'ng2-slimscroll';

import { AppComponent } from './app.component';
import { MusicService } from './music.service';
import { StrLimitPipe } from './str-limit.pipe';
import { SiteConfig } from './site-config';

const CONFIG: SiteConfig = {
  albumId: 'knJHtLpJFszQVTkFxyFHZn',
  defaultThumbnail: 'https://graph.facebook.com/134325980235485/picture?width=180&height=180',
  facebookUrl: 'https://fb.me/r4yqu4z4'
};

@NgModule({
  declarations: [
    AppComponent,
    StrLimitPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SlimScrollModule
  ],
  providers: [
    MusicService,
    {
      provide: 'SiteConfig', useValue: CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
