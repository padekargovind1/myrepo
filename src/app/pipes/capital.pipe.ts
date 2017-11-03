import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capital'
})
export class CapitalPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.toString().substr(0, 1).toUpperCase()+value.toString().substr(1, value.length-1);
  }

}
