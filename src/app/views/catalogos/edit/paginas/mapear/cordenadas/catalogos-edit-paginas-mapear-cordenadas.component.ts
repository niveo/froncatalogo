import { Component, HostListener, Inject, ViewChild } from "@angular/core";
import { MSG1, MSG4, MSG5 } from "src/app/common/constantes";
import { isEmptys } from "src/app/common/util";
import { CatalogoPaginaProdutoService, NotifyService, ProdutosServices } from "src/app/services";
import { Produto } from 'src/app/models/produto';
import { MatInput } from "@angular/material/input";
import { Catalogo, CatalogoPagina, CatalogoPaginaProduto } from "src/app/models/catalogo";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { notificaProdutoMapeadoAction } from "src/app/store";

interface DataCordenadaPagina {
    codigoProduto?: number;
    codigoPaginaProduto?: number;
    codigo: number;
    catalogo: number;
    cordenadas: Cropper.Data;
}

@Component({
    selector: 'catalogos-edit-paginas-mapear-cordenadas-component',
    templateUrl: 'catalogos-edit-paginas-mapear-cordenadas.component.html'
})
export class CatalogosEditPaginasMapearCordenadasComponent {

    progress = false;
    referenciaProduto: string;
    produto: Produto;
    @ViewChild('materialInput', { read: MatInput }) materialInput: MatInput;

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: DataCordenadaPagina,
        private produtoService: ProdutosServices,
        private notify: NotifyService,
        private store: Store<{ notificar: Boolean }>,
        private catalogoPaginaProdutoService: CatalogoPaginaProdutoService) {
        if (!isEmptys(data.codigoProduto)) {
            this.onPesquisaCodigoProdutoKey(data.codigoProduto);
        }
    }


    @HostListener('keydown', ['$event'])
    onHover(e: KeyboardEvent) {
        if (e.altKey && e.ctrlKey && e.key === 'e') {
            this.onSalvarNovo()
        } else {
            if (e.altKey && e.ctrlKey && e.key === 's') {
                this.onSalvarSair()
            }
        }
    }

    ngAfterViewInit() {
        this.onFocarInput();
    }

    private onFocarInput() {
        setTimeout(() => {
            this.materialInput.focus();
        }, 300)
    }

    onPesquisaCodigoProdutoKey(codigoProduto) {
        this.progress = true;
        this.produto = null;
        if (!isEmptys(codigoProduto)) {
            this.produtoService.obterCodigo(codigoProduto).subscribe({
                next: registro => {
                    this.produto = registro;
                }, error: () => {
                    this.notify.error(MSG4);
                    this.progress = false;
                }, complete: () => this.progress = false,
            });
        }
    }

    onPesquisaReferenciaProdutoKey() {
        this.progress = true;
        this.produto = null;
        if (!isEmptys(this.referenciaProduto)) {
            this.produtoService.obterReferencia(this.referenciaProduto).subscribe({
                next: registro => {
                    this.produto = registro;
                }, error: () => {
                    this.notify.error(MSG4);
                    this.onFocarInput();
                    this.progress = false;
                }, complete: () => this.progress = false,
            });
        }
    }

    onSalvarNovo() {
        this.onSalvarServisor(0);
    }

    onSalvarSair() {
        this.onSalvarServisor(1);
    }

    private onSalvarServisor(tipo: number) {
        this.progress = true;
        let catalogoPaginaProduto = new CatalogoPaginaProduto();
        if (!isEmptys(this.data.codigoPaginaProduto)) {
            catalogoPaginaProduto.codigo = this.data.codigoPaginaProduto;
        }
        catalogoPaginaProduto.inicialPosicalX = this.data.cordenadas.x;
        catalogoPaginaProduto.inicialPosicalY = this.data.cordenadas.y;
        catalogoPaginaProduto.finalPosicalX = this.data.cordenadas.x + this.data.cordenadas.width;
        catalogoPaginaProduto.finalPosicalY = this.data.cordenadas.y + this.data.cordenadas.height;
        catalogoPaginaProduto.width = this.data.cordenadas.width;
        catalogoPaginaProduto.height = this.data.cordenadas.height;
        catalogoPaginaProduto.produto = this.produto;
        catalogoPaginaProduto.catalogoPagina = new CatalogoPagina();
        catalogoPaginaProduto.catalogoPagina.codigo = this.data.codigo;
        catalogoPaginaProduto.catalogoPagina.catalogo = new Catalogo();
        catalogoPaginaProduto.catalogoPagina.catalogo.codigo = this.data.catalogo;
        this.catalogoPaginaProdutoService.salvar(catalogoPaginaProduto).subscribe({
            next: registro => {
                this.data.codigoPaginaProduto = registro['codigo'];
                this.notify.info(MSG1);
                if (tipo === 0) {
                    this.onNovoRegistro();
                } else {
                    this.onClose();
                }
                this.store.dispatch(notificaProdutoMapeadoAction());
            }, error: () => {
                this.notify.error(MSG5);
                this.progress = false;
            }
            , complete: () => this.progress = false,
        });
    }

    private onNovoRegistro() {
        this.data.codigoPaginaProduto = null;
        this.referenciaProduto = null;
        this.produto = null;
        this.onFocarInput();
    }

    onClose() {
        this.dialogRef.close();
    }
}