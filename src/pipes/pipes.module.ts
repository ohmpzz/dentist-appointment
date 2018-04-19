import { NgModule } from '@angular/core';
import { CurrencyBathPipe } from './currency-bath/currency-bath';
import { MinuteThPipe } from './minute-th/minute-th';
import { ProviderPipe } from './provider/provider';
import { MonthThPipe } from './month-th/month-th';
@NgModule({
	declarations: [CurrencyBathPipe,
    MinuteThPipe,
    ProviderPipe,
    MonthThPipe],
	imports: [],
	exports: [CurrencyBathPipe,
    MinuteThPipe,
    ProviderPipe,
    MonthThPipe]
})
export class PipesModule {}
