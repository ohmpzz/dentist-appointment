import { AppointmentDatePipe, AppointmentDateFromNowPipe } from './appointment-date/appointment-date';
import { NgModule } from '@angular/core';
import { CurrencyBathPipe } from './currency-bath/currency-bath';
import { MinuteThPipe } from './minute-th/minute-th';
import { ProviderPipe, ProviderNamePipe } from './provider/provider';
import { MonthThPipe } from './month-th/month-th';


const PIPES = [
        CurrencyBathPipe,
        MinuteThPipe,
        ProviderPipe,
        MonthThPipe,
        AppointmentDatePipe,
        ProviderNamePipe,
        AppointmentDateFromNowPipe
    ]

@NgModule({
	declarations: PIPES,
	imports: [],
	exports: PIPES
})
export class PipesModule {}
