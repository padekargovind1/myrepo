import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capital'
})
export class CapitalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.substr(0, 1).toUpperCase()+value.substr(1, value.length-1);
  }

}
