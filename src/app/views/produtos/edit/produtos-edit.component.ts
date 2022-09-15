import { Component, Inject } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { FormControl, Validators } from '@angular/forms';
import { MSG1, MSG5 } from 'src/app/common/constantes';
import { ProdutosServices } from 'src/app/services/produtos.services';
import { NotifyService } from 'src/app/services';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'produtos-edit-component',
    templateUrl: './produtos-edit.component.html',
    styleUrls: ['./produtos-edit.component.scss']
})
export class ProdutosEditComponent {

    descricaoForm = new FormControl('', [Validators.required, Validators.maxLength(100)]);
    referenciaForm = new FormControl('', [Validators.required, Validators.maxLength(15)]);
    valorForm = new FormControl(0.00, [Validators.required]);

    constructor(public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: Produto,
        private produtosServices: ProdutosServices,
        private notify: NotifyService) {
        dialogRef.disableClose = true;
        this.descricaoForm.setValue(data.descricao!);
        this.referenciaForm.setValue(data.referencia!);
        this.valorForm.setValue(data.valor!)
    }

    getErrorMessageDescricao() {
        if (this.descricaoForm.hasError('required')) {
            return 'Informe uma descrição';
        }
        return '';
    }

    getErrorMessageReferencia() {
        if (this.referenciaForm.hasError('required')) {
            return 'Informe uma referência';
        }
        return '';
    }

    getErrorMessageValor() {
        if (this.valorForm.hasError('required')) {
            return 'Informe um valor';
        }
        return '';
    }


    onClose() {
        this.dialogRef.close();
    }

    onSalvar() {
        this.data.descricao = this.descricaoForm.value;
        this.data.valor = this.valorForm.value;
        this.data.referencia = this.referenciaForm.value;

        this.produtosServices.salvar(this.data).subscribe({
            next: () => {
                this.notify.info(MSG1);
                this.dialogRef.close();
            }, error: () => this.notify.error(MSG5)
        });
    }
}
