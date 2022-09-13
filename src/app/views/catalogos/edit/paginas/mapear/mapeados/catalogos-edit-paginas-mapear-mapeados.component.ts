import { Component, Inject, } from "@angular/core";
import { CatalogoPaginaProdutoService, NotifyService } from "src/app/services";
import { CatalogoPaginaProduto } from "src/app/models/catalogo";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmacaoDialogService } from "src/app/dialogs/confirmacaodialog.component";
import { MSG2, MSG6 } from "src/app/common/constantes";
import { Store } from "@ngrx/store";
import { notificaProdutoMapeadoAction } from "src/app/store";

@Component({
    selector: 'catalogos-edit-paginas-mapear-mapeados-component',
    templateUrl: 'catalogos-edit-paginas-mapear-mapeados.component.html'
})
export class CatalogosEditPaginasMapearMapeadosComponent {

    registros: CatalogoPaginaProduto[] = [];

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private catalogoPaginaProdutoService: CatalogoPaginaProdutoService,
        private confirmacaoDialogService: ConfirmacaoDialogService,
        private store: Store<{ notificar: Boolean }>,
        private notify: NotifyService) { 
    }

    ngAfterViewInit() {
        this.catalogoPaginaProdutoService.obterRegistrosPagina(this.data).subscribe({
            next: registros => {
                this.registros = registros;
            }
        });
    }

    onClose() {
        this.dialogRef.close();
    }

    onDetalhar(registro: CatalogoPaginaProduto) {
        this.dialogRef.close(registro);
    }

    onRemover(registro: CatalogoPaginaProduto) {
        this.confirmacaoDialogService.open().afterClosed().subscribe((confirmacao: boolean) => {
            if (confirmacao) {
                this.catalogoPaginaProdutoService.remover(registro.codigo!!).subscribe({
                    next: () => {
                        this.notify.info(MSG2);
                        let index = this.registros.findIndex(c => c.codigo == registro.codigo);
                        this.registros.splice(index, 1);
                        this.store.dispatch(notificaProdutoMapeadoAction());
                    }, error: () => this.notify.error(MSG6)
                });
            }
        });
    }
}