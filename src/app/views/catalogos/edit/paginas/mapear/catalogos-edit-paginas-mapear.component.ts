import { Component, HostListener, Inject, ViewChild, OnDestroy, OnInit } from "@angular/core";
import { Location } from '@angular/common'
import { ActivatedRoute } from "@angular/router";
import { CropperComponent } from "projects/angular-cropperjs/src/public_api";
import { APP_CONFIG, IConfigToken } from "src/app/common/app-config";
import { CatalogoPaginaProdutoService, NotifyService } from "src/app/services";
import { MatDialog } from "@angular/material/dialog";
import { CatalogosEditPaginasMapearCordenadasComponent } from "./cordenadas/catalogos-edit-paginas-mapear-cordenadas.component";
import { CatalogoPaginaProduto } from "src/app/models/catalogo";
import { CatalogosEditPaginasMapearMapeadosComponent } from "./mapeados/catalogos-edit-paginas-mapear-mapeados.component";
import { Store } from '@ngrx/store';
import { isEmptys } from "src/app/common/util";

@Component({
    selector: 'catalogos-edit-paginas-mapear-component',
    templateUrl: 'catalogos-edit-paginas-mapear.component.html'
})
export class CatalogosEditPaginasMapearComponent implements OnDestroy, OnInit {

    contaMapeados = 0;
    imageUrl: string = '';
    ativarFinalCrop = false;
    configCropper: Cropper.Options = {
        checkCrossOrigin: false,
        autoCrop: false,
        zoomable: true,
        movable: true,
        
    }
    @ViewChild('angularCropper') public angularCropper: CropperComponent;

    codigo: number;
    catalogo: number;
    private codigoProduto: number;
    private codigoPaginaProduto: number;
    private storeSubscribe: any;

    notificaProdutoMapeado$ = this.store.select(state => state.notificar);

    constructor(private location: Location,
        @Inject(APP_CONFIG) public config: IConfigToken,
        private route: ActivatedRoute,
        private _notify: NotifyService,
        private store: Store<{ notificar: Boolean }>,
        private catalogoPaginaProdutoService: CatalogoPaginaProdutoService,
        private dialog: MatDialog,
    ) {
        this.route.params.subscribe(params => {
            this.onCarregarRegistro(params['codigo'], params['catalogo']);
        });
    }

    ngOnInit() {
        this.storeSubscribe = this.notificaProdutoMapeado$.subscribe(() => {
            this.consultaContaProdutosMapeados();
        });
    }

    ngOnDestroy() {
        this.storeSubscribe.unsubscribe();
    }

    @HostListener('keydown', ['$event'])
    onHover(e: KeyboardEvent) {
        if (e.altKey && e.ctrlKey && e.key === 'p') {
            this.lancarCordenadas();
        } else {
            if (e.altKey && e.ctrlKey && e.key === 'i') {
                this.incluirCordenadas();
            }
        }
    }

    ngAfterViewInit() {
        this.angularCropper.image.nativeElement.addEventListener('cropend', (event) => {
            if (this.ativarFinalCrop) {
                this.lancarCordenadas();
            }
        });
    }

    onCarregarRegistro(codigo: number, catalogo: number) {
        this.codigo = codigo;
        this.catalogo = catalogo;
        this.imageUrl = `${this.config.urlCatalogos}/${catalogo}/paginas/${codigo}.jpeg`;
        this.consultaContaProdutosMapeados();
    }

    private consultaContaProdutosMapeados() {
        this.catalogoPaginaProdutoService.obterRegistrosPaginaConta(this.codigo).subscribe({
            next: conta => {
                this.contaMapeados = conta;
            }
        });
    }

    goBack() {
        this.location.back();
    }

    incluirCordenadas() {
        this.angularCropper.cropper.clear();
    }

    lancarCordenadas() {
        let cordenadas = this.angularCropper.cropper.getData();
        if (cordenadas.width === 0 && cordenadas.height === 0) {
            this._notify.warning('Informe uma cordenada.');
            return;
        }
        this.dialog.open(CatalogosEditPaginasMapearCordenadasComponent, {
            width: '50%',
            data: {
                codigo: this.codigo,
                catalogo: this.catalogo,
                cordenadas: cordenadas,
                codigoProduto: this.codigoProduto,
                codigoPaginaProduto: this.codigoPaginaProduto
            }
        });
    }

    produtosMapeados() {
        this.dialog.open(CatalogosEditPaginasMapearMapeadosComponent, {
            width: '50%',
            height: '80%',
            data: this.codigo
        }).afterClosed().subscribe({
            next: (value: CatalogoPaginaProduto) => {
                if (!isEmptys(value)) {
                    this.detalharProdutoMapeado(value);
                }
            }
        });
    }

    detalharProdutoMapeado(e: CatalogoPaginaProduto) {
        this.codigoProduto = e.produto.codigo;
        this.codigoPaginaProduto = e.codigo;
        setTimeout(() => {
            this.angularCropper.cropper.crop();
            this.angularCropper.cropper.setData({
                x: e.inicialPosicalX,
                y: e.inicialPosicalY,
                width: e.width,
                height: e.height,
                rotate: 0
            })
        }, 300);
    }


    zoomIn() {
        this.angularCropper.cropper.zoom(0.1);
    }

    zoomOut() {
        this.angularCropper.cropper.zoom(-0.1);
    }

    setDragModeMove() {
        this.angularCropper.cropper.setDragMode("move");
    }

    setDragModeCrop() {
        this.angularCropper.cropper.setDragMode("crop");
    }

    cropperReset() {
        this.angularCropper.cropper.reset();
    }


}