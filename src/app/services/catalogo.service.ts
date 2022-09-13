import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Catalogo } from "../models/catalogo";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class CatalogoService extends BaseService<Catalogo> {
    constructor(override  http: HttpClient) {
        super(http, 'catalogo');
    }
}