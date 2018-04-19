import { NgModule } from '@angular/core';
import { CurrencyBathPipe } from './currency-bath/currency-bath';
import { MinuteThPipe } from './minute-th/minute-th';
import { ProviderPipe } from './provider/provider';
import { MonthThPipe } from './month-th/month-th';

const PIPES = [
        CurrencyBathPipe,
        MinuteThPipe,
        ProviderPipe,
        MonthThPipe,
    ]

@NgModule({
	declarations: PIPES,
	imports: [],
	exports: PIPES
})
export class PipesModule {}
