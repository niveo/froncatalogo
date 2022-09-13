import { Component, Inject, Input } from "@angular/core";
import { Router } from "@angular/router";
import { APP_CONFIG, IConfigToken } from "src/app/common/app-config";
import { Catalogo, CatalogoPagina } from "src/app/models/catalogo";

@Component({
    selector: 'catalogos-edit-paginas-component',
    templateUrl: 'catalogos-edit-paginas.component.html',
    styleUrls: ['catalogos-edit-paginas.component.scss']
})
export class CatalogosEditPaginasComponent {

    constructor(@Inject(APP_CONFIG) public config: IConfigToken,
        private route: Router
    ) { }

    @Input()
    catalogo?: Catalogo;

    @Input()
    registro?: CatalogoPagina;

    onMapear() {
        this.route.navigate(['/mapear', this.registro?.codigo, this.catalogo?.codigo]);
    }
}