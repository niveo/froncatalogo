import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CatalogoPaginaProduto } from "../models/catalogo";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class CatalogoPaginaProdutoService extends BaseService<CatalogoPaginaProduto>{
    constructor(override http: HttpClient) {
        super(http, 'catalogopaginaproduto');
    }

    obterRegistrosPagina(codigo: number) {
        return this.http.get<CatalogoPaginaProduto[]>(`/catalogopaginaproduto/pagina/${codigo}`);
    }

    obterRegistrosPaginaConta(codigo: number) {
        return this.http.get<number>(`/catalogopaginaproduto/pagina/conta/${codigo}`);
    }
}