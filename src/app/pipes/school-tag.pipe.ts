import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolTag'
})
export class SchoolTagPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    for(let i=0; i<value.length; i++){
      if(value[i]==' '){
        return value.substring(0, i);
      }
    }
    return value;
  }

}
