import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schoolName'
})
export class SchoolNamePipe implements PipeTransform {

  transform(value: string, args: string): any {
    for(let i=0; i<value.length; i++){
      if(value[i]=='-'){
        if(value[i-1]==' ' && value[i+1]==' '){
          return value.substring(0, i-1)
        }
      }
    }
    return value;
  }

}
