import { Pipe, PipeTransform } from '@angular/core';

interface Provider { student: boolean, dentist: boolean }

@Pipe({
  name: 'provider',
})
export class ProviderPipe implements PipeTransform {
  data = {
    dentist: 'หมอ',
    student: 'นักศึกษา'
  }
  

  transform(provider: any, ...args) {
    console.log('pipe provider: ', provider)
    let prepare = ''
    for(let key in provider) {
      prepare += `${this.getCompareVal(key, provider)} `
    }
    return prepare
  }

  getCompareVal(key, provider: Provider) {
    return (provider[key]) ? this.data[key] : ''
  }
}


@Pipe({
  name: 'providerName',
})
export class ProviderNamePipe implements PipeTransform {
  data = {
    dentist: 'หมอ',
    student: 'นักศึกษา'
  }
  

  transform(provider: any, ...args) {
    return (!!this.data[provider]) ? this.data[provider] : ''
  }
}