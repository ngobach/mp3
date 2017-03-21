import { Pipe, PipeTransform } from '@angular/core';
import { Song } from './song';

@Pipe({
  name: 'songFilter'
})
export class SongFilterPipe implements PipeTransform {

  transform(value: Song[], args?: string): Song[] {
    if (!value || !args) {
      return value;
    } else {
      if (typeof args === 'string') {
        args = args.toLocaleLowerCase();
      }
      return value.filter(song => song.artist.toLocaleLowerCase().indexOf(args) >= 0 || song.name.toLocaleLowerCase().indexOf(args) >= 0);
    }
  }

}
