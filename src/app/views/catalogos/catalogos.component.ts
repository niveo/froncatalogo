import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MSG4 } from 'src/app/common/constantes';
import { Catalogo } from 'src/app/models/catalogo';
import { NotifyService } from 'src/app/services';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements OnInit {

  descricaoView = 'Catalogos';
  progress = false;
  registros: Catalogo[] = [];

  constructor(private catalogoService: CatalogoService,
    private route: Router,
    private notify: NotifyService) { }

  ngOnInit(): void {
    this.onCarregarRegistros();
  }

  novoRegistro() {
    this.route.navigate(['/catalogo/', 0]);
  }
 

  onCarregarRegistros() {
    this.progress = true;
    this.catalogoService.obterTodos().subscribe({
      next: registros => {
        this.registros = registros;
        this.progress = false;
      }, error: () => {
        this.notify.error(MSG4);
        this.progress = false;
      }
    });
  }
}
