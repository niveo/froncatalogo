import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { MatDialog } from '@angular/material/dialog';
import { ProdutosEditComponent } from '../edit/produtos-edit.component';
import { ConfirmacaoDialogService } from 'src/app/dialogs/confirmacaodialog.component';
import { MSG2, MSG6 } from 'src/app/common/constantes';
import { ProdutosServices } from 'src/app/services/produtos.services';
import { NotifyService } from 'src/app/services';
@Component({
    selector: 'produtos-card-component',
    templateUrl: './produtos-card.component.html',
    styleUrls: ['./produtos-card.component.scss']
})
export class ProdutosCardComponent {

    constructor(public dialog: MatDialog,
        private confirmacaoDialogService: ConfirmacaoDialogService,
        private produtosServices: ProdutosServices,
        private notify: NotifyService) { }

    @Input()
    registro?: Produto;

    @Output('onRemover')
    onRemoverEvent = new EventEmitter<any>();

    onEditar() {
        this.dialog.open(ProdutosEditComponent, {
            width: '500px',
            data: this.registro
        }).afterClosed().subscribe(() => this.onRemoverEvent.emit());
    }

    onRemover() {
        this.confirmacaoDialogService.open().afterClosed().subscribe((confirmacao: boolean) => {
            if (confirmacao) {
                this.produtosServices.remover(this.registro?.codigo!!).subscribe({
                    next: () => {
                        this.notify.info(MSG2);
                        this.onRemoverEvent.emit();
                    }, error: () => this.notify.error(MSG6)
                });
            }
        });
    }
}