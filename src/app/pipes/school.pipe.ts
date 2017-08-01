import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'school'
})
export class SchoolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length > 42) {
      // console.log(value.length)
      return value.substr(0, 40)+'...';
    }
    return value;
  }

}
