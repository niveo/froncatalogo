import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CatalogosComponent, CatalogosEditComponent,
  CatalogosEditPaginasMapearComponent, PageNotFoundComponent, ProdutosComponent
} from './views';

const routes: Routes = [
  {
    path: 'produtos', component: ProdutosComponent, title: 'Produtos'
  },
  {
    path: 'catalogos', component: CatalogosComponent, title: 'Catalogos'

  },
  {
    path: 'catalogo/:codigo', component: CatalogosEditComponent, title: 'Catalogo'
  },
  {
    path: 'mapear/:codigo/:catalogo', component: CatalogosEditPaginasMapearComponent, title: 'Mapear'
  },
  {
    path: '', redirectTo: '/catalogos', pathMatch: 'full' 
  }, {
    path: '**', component: PageNotFoundComponent, title: 'Not found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
