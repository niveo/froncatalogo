import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuRota {
  descricao: string;
  icone: string;
  rota: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private route: Router) { }

  menuRotas: MenuRota[] = [{
    descricao: 'Catalogos', icone: 'auto_stories', rota: 'catalogos'
  }, {
    descricao: 'Produtos', icone: 'shopping_cart', rota: 'produtos'
  }];

  navegar(rota: string) {
    this.route.navigate(['/' + rota])
  }

}
