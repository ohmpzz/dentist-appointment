import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'currencyBath',
})
export class CurrencyBathPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return `${value} ฿`
  }
}
