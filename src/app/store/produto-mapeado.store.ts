import { createAction } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';

export const notificaProdutoMapeadoAction = createAction('Produto Maepado');

export const notificaProdutoMapeadoActionReducer = createReducer(
    false,
    on(notificaProdutoMapeadoAction, (state) => state = !state),
);
