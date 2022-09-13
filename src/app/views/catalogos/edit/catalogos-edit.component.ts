import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Catalogo } from "src/app/models/catalogo";
import { CatalogoService } from "src/app/services/catalogo.service";
import { Location } from '@angular/common'
import { MSG1, MSG4, MSG5 } from "src/app/common/constantes";
import { MatDialog } from "@angular/material/dialog";
import { CatalogosEditImportComponent } from "./import/catalogos-edit-import.component";
import { NotifyService } from "src/app/services";
import { FormControl, Validators } from "@angular/forms";
import { isEmptys } from "src/app/common/util";

@Component({
    selector: 'catalogos-edit-component',
    templateUrl: 'catalogos-edit.component.html'
})
export class CatalogosEditComponent {

    maxLengthDescricao = 30;
    maxLengthUrl= 100;
    registro?: Catalogo;
    selectedIndex = 0;

    descricaoForm = new FormControl('', [Validators.required, Validators.maxLength(this.maxLengthDescricao)]);
    observacaoForm = new FormControl('', [Validators.maxLength(255)]);

    constructor(private route: ActivatedRoute,
        private location: Location,
        private catalogoService: CatalogoService,
        private notify: NotifyService,
        public dialog: MatDialog) {

        this.route.params.subscribe(params => {
            if (params['codigo'] != 0) {
                this.onCarregarRegistro(params['codigo']);
            } else {
                this.novoRegistro();
            }
        })
    }

    private novoRegistro() {
        this.registro = new Catalogo();
    }

    goBack() {
        this.location.back();
    }

    onCarregarRegistro(codigo: number) {
        this.catalogoService.obterCodigo(codigo).subscribe({
            next: registro => {
                this.registro = registro;
                if (!isEmptys(this.registro)) {
                    this.descricaoForm.setValue(this.registro.descricao);
                    this.observacaoForm.setValue(this.registro.observacao);
                }
            }, error: () => this.notify.error(MSG4)
        });
    }

    onSalvar() {
        this.registro.descricao = this.descricaoForm.value;
        this.registro.observacao = this.observacaoForm.value;
        this.catalogoService.salvar(this.registro!).subscribe({
            next: registro => {
                this.notify.info(MSG1);
                this.registro = registro;
            }, error: () => this.notify.error(MSG5)
        });
    }

    onImportarCatalogo() {
        this.dialog.open(CatalogosEditImportComponent, {
            data: this.registro?.codigo
        }).afterClosed().subscribe({
            complete: () => this.onCarregarRegistro(this.registro?.codigo!)
        })
    }

}