import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'minuteTh',
})
export class MinuteThPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    return `${value} นาที`
  }
}
