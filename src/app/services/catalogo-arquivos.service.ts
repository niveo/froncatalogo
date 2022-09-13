import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CatalogoArquivosService {
    constructor(private http: HttpClient) { }

    importarCatalogo(codigo: number, dpi: number, file: File) {
        var formData = new FormData();
        formData.append('file', file);
        return this.http.post(`/catalogoarquivo/uploadcatalogo/${codigo}`, formData, {
            params: {
                dpi: dpi
            }
        });
    }
}