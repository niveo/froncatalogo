import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MSG4 } from 'src/app/common/constantes';
import { Produto } from 'src/app/models/produto';
import { NotifyService } from 'src/app/services';
import { ProdutosServices } from 'src/app/services/produtos.services';
import { ProdutosEditComponent } from './edit/produtos-edit.component';

@Component({
  selector: 'produtos-component',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  descricaoView = 'Produtos';
  progress = false;
  registros: Produto[] = [];

  constructor(private produtosServices: ProdutosServices,
    public dialog: MatDialog,
    private notify: NotifyService) { }

  ngOnInit(): void {
    this.onCarregarRegistros();
  }

  onCarregarRegistros() {
    this.progress = true;
    this.produtosServices.obterTodos().subscribe({
      next: registros => {
        this.registros = registros;
        this.progress = false;
      }, error: () => {
        this.notify.error(MSG4);
        this.progress = false;
      }
    });
  }

  novoRegistro() {
    this.dialog.open(ProdutosEditComponent, {
      width: '500px',
      data: new Produto()
    }).afterClosed().subscribe(() => this.onCarregarRegistros());
  }
}
