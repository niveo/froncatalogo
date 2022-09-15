import { DATA_PT } from "./constantes";
import { format, parseISO } from 'date-fns';

export function getDateMoment(value: Date, formato: string = DATA_PT) {
    if (typeof (value) === 'string') {
        value = parseISO(value);
    }
    if (value) {
        let dt = format(value, formato);
        return dt;
    } else {
        return null;
    }
}

export function formatFileSize(bytes: string): any {
    var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        n = parseInt(bytes, 10) || 0,
        l = 0;
    while (n >= 1024) {
        n = n / 1024;
        l++;
    }
    return (n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}

export function isEmptys(value: any, field?: string): boolean {
    if (field) {
        if (Array.isArray(value)) {
            return value[field] === 0;
        } else {
            return (value === undefined || value === null || value[field] === undefined || value[field] === null || value[field] === '');
        }
    } else {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return (value === undefined || value === null || value === '');
        }
    }
}

export function converterValor(value: number,
    digitos: number = 2,
    currencyDisplay: string = 'code'): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'decimal', currency: 'BRL', maximumFractionDigits: digitos,
        minimumFractionDigits: digitos, currencyDisplay: currencyDisplay 
    }).format(value);
}

window['convertNumberFormat'] = converterValor
