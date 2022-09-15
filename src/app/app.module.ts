import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_CONFIG } from './common/app-config';
import { InterceptorModule } from './interceptors/http.interceptor';
import { AppMaterialModule } from './common/app-material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmacaoDialogComponent } from './dialogs/confirmacaodialog.component';
import { CurrencybrPipe, DateptBrPipe, DateTimeptBrPipe, SanitizeHtmlPipe } from './pipes';
import {
  CatalogosCardComponent, CatalogosComponent,
  CatalogosEditComponent, CatalogosEditImportComponent,
  CatalogosEditPaginasComponent,
  CatalogosEditPaginasMapearComponent,
  CatalogosEditPaginasMapearCordenadasComponent,
  PageNotFoundComponent,
  ProdutosCardComponent, ProdutosComponent,
  ProdutosEditComponent,
} from './views';
import { AlertComponent, UploadComponent } from './components';
import { AngularCropperjsModule } from 'projects/angular-cropperjs/src/public_api';
import { CatalogosEditPaginasMapearMapeadosComponent } from './views/catalogos/edit/paginas/mapear/mapeados/catalogos-edit-paginas-mapear-mapeados.component';
import { StoreModule } from '@ngrx/store';
import { notificaProdutoMapeadoActionReducer } from './store'; 
import { environment } from '../environments/environment'; 


@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    CatalogosComponent,
    ProdutosCardComponent,
    ProdutosEditComponent,
    DateptBrPipe,
    DateTimeptBrPipe,
    SanitizeHtmlPipe,
    CurrencybrPipe,
    ConfirmacaoDialogComponent,
    CatalogosCardComponent,
    CatalogosEditComponent,
    CatalogosEditImportComponent,
    CatalogosEditPaginasComponent,
    CatalogosEditPaginasMapearComponent,
    CatalogosEditPaginasMapearCordenadasComponent,
    CatalogosEditPaginasMapearMapeadosComponent,
    UploadComponent,
    AlertComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    InterceptorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    AngularCropperjsModule,
    StoreModule.forRoot({
      notificar: notificaProdutoMapeadoActionReducer
    }) 
  ],
  providers: [
    { provide: APP_CONFIG, useValue: environment }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
