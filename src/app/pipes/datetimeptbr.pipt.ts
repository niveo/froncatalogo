import { Pipe, PipeTransform } from '@angular/core';
import { DATATIME_PT } from '../common/constantes';
import { getDateMoment, isEmptys } from '../common/util';

@Pipe({
    name: 'datetimeptbr'
})
export class DateTimeptBrPipe implements PipeTransform {
    transform(value: any,): any {
        if (!isEmptys(value)) {
            return getDateMoment(new Date(value), DATATIME_PT);
        }
    }
}
