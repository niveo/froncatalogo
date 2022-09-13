import { Pipe, PipeTransform } from '@angular/core';
import { getDateMoment, isEmptys } from '../common/util';

@Pipe({
    name: 'dateptbr'
})
export class DateptBrPipe implements PipeTransform {
    transform(value: any,): any {
        if (!isEmptys(value)) {
            return getDateMoment(new Date(value));
        }
    }
}
