import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'school'
})
export class SchoolPipe implements PipeTransform {

  transform(value: string, limit: any): any {
    if (value.length > limit) {
      // console.log(value.length)
      return value.substr(0, limit)+'...';
    }
    return value;
  }

}
