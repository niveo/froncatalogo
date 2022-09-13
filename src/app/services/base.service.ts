import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { isEmptys } from "../common/util";
import { ModelID } from "../models/base";

export abstract class BaseService<T extends ModelID> {
    constructor(public http: HttpClient, public path: String) { }

    obterCodigo(codigo: number): Observable<T> {
        return this.http.get<T>(`/${this.path}/${codigo}`);
    }


    obterTodos(): Observable<T[]> {
        return this.http.get<T[]>(`/${this.path}`);
    }

    remover(codigo: number) {
        return this.http.delete(`/${this.path}/${codigo}`);
    }

    salvar(entity: T) {
        if (!isEmptys(entity.codigo)) {
            return this.http.put(`/${this.path}/${entity.codigo}`, entity);
        } else {
            return this.http.post(`/${this.path}`, entity);
        }
    }
}