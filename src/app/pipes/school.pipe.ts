import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'school'
})
export class SchoolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length > 50) {
      // console.log(value.length)
      return value.substr(0, 50)+'...';
    }
    return value;
  }

}
