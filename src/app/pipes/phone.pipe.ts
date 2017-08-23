import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value[0]+value[1]+' '+value[2]+value[3]+' '+value[4]+value[5]+' '+value[6]+value[7]+' '+value[8]+value[9];
  }

}
