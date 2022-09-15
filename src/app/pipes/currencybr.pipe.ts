import { Pipe, PipeTransform } from '@angular/core';
import { converterValor } from '../common/util';

@Pipe({
  name: 'currencybr'
})
export class CurrencybrPipe implements PipeTransform {

  transform(value: number, digitos: number = 2): string {
    if (value !== undefined && value !== null) {
        return converterValor(value, digitos);
    } else {
        return '0';
    }
}

}
