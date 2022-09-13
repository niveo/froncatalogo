import { Component, Inject } from "@angular/core";
import { MSG3 } from "src/app/common/constantes";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
    CatalogoArquivosService,
    NotifyService
} from "src/app/services";


@Component({
    selector: 'catalogos-edit-import-component',
    templateUrl: 'catalogos-edit-import.component.html'
})
export class CatalogosEditImportComponent {
    constructor(public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private catalogoArquivosService: CatalogoArquivosService,
        private _notify: NotifyService) {
            dialogRef.updateSize('500px');
    }

    file?: File;
    dpi: number = 150;
    progress = false;

    onEventFileSelected(e: File) {
        this.file = e;
    }

    onImportarCatalog() {
        if (this.file == null) {
            this._notify.error(MSG3);
            return;
        }
        this.progress = true;
        this.catalogoArquivosService.importarCatalogo(this.data, this.dpi, this.file!)
            .subscribe({
                next: ret => {
                    if (ret) {
                        this.dialogRef.close();
                    }
                },
                complete: () => this.progress = false,
                error: () => {
                    this.progress = false;
                    this._notify.error('Erro importar registro');
                }
            });
    }
}