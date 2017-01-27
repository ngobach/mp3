import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class StrLimitPipe implements PipeTransform {

  transform(value: string, args?: number): string {
    const length = args || 20;
    if (value.length <= length) {
      return value;
    }
    return value.substr(0, length - 3) + '...';
  }

}
