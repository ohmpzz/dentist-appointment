import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'monthTh',
})
export class MonthThPipe implements PipeTransform {

  transform(value: any, ...args) {
    return moment(value).locale('Th').format('MMM')
  }
}
