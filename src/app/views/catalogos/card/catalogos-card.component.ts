import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MSG2, MSG6 } from "src/app/common/constantes";
import { ConfirmacaoDialogService } from "src/app/dialogs/confirmacaodialog.component";
import { Catalogo } from "src/app/models/catalogo";
import { CatalogoService, NotifyService } from "src/app/services";

@Component({
    selector: 'catalogos-card-component',
    templateUrl: 'catalogos-card.component.html'
})
export class CatalogosCardComponent {

    constructor(private route: Router, private catalogoService: CatalogoService,
        private notify: NotifyService,
        private confirmacaoDialogService: ConfirmacaoDialogService) { }

    @Input()
    registro?: Catalogo;

    @Output('onRemover')
    onRemoverEvent = new EventEmitter<any>();

    onEditar() {
        this.route.navigate(['/catalogo/', this.registro?.codigo]);
    }

    onRemover() {
        this.confirmacaoDialogService.open().afterClosed().subscribe((confirmacao: boolean) => {
            if (confirmacao) {
                this.catalogoService.remover(this.registro?.codigo!!).subscribe({
                    next: () => {
                        this.notify.info(MSG2);
                        this.onRemoverEvent.emit();
                    }, error: () => this.notify.error(MSG6)
                });
            }
        });
    }
}