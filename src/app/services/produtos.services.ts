import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class ProdutosServices extends BaseService<Produto> {
    constructor(override http: HttpClient) {
        super(http, 'produto');
    }

    obterReferencia(referencia: string): Observable<Produto> {
        return this.http.get<Produto>(`/${this.path}/referencia/${referencia}`);
    }
}