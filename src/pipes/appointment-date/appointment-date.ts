import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appointmentDate',
})
export class AppointmentDatePipe implements PipeTransform {

  transform(datetime: AppointmentDate, ...args) {
    console.log('[datatime]: ', datetime)
    const date = moment(datetime.date).locale('Th').add(543, 'y').format('dddd, DD MMM YY')
    const start = moment(datetime.start_time).format('H.mm')
    const end = moment(datetime.end_time).format('H.mm')
    return `${date} ${start} - ${end}น.`
  }
}

interface AppointmentDate {
  date?: any
  start_time?: any
  end_time?: any
}

@Pipe({
  name: 'appointmentFromNow',
})
export class AppointmentDateFromNowPipe implements PipeTransform {

  transform(datetime: AppointmentDate, ...args) {
    const date = moment(datetime.date).locale("Th").fromNow()
    return `${date}`
  }
}



