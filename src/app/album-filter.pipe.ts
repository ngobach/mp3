import { Pipe, PipeTransform } from '@angular/core';
import { Song } from './song';
import { Album } from './site-config';

@Pipe({
  name: 'albumFilter'
})
export class AlbumFilterPipe implements PipeTransform {

  transform(value: Song[], args?: Album): Song[] {
    if (!value || !args || !args.id) {
      return value;
    }
    return value.filter(song => song.albums.indexOf(args) >= 0);
  }

}
