import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number): any {
    if (value.length > limit) {
      // console.log(value.length)
      return value.substr(8, 2)+'/'+value.substr(5, 2)+'/'+value.substr(0, 4)
    }
    return value;
  }
}
