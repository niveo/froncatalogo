import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isEmptys } from '../common/util';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(public _sanitizer: DomSanitizer) {
  }

  transform(v: string): SafeHtml {
    if (isEmptys(v)) return '';
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }

}
