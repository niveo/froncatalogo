import { ModelID } from './base';
import { Produto } from './produto';

export class CatalogoPaginaProduto extends ModelID {
    catalogoPagina?: CatalogoPagina;
    produto?: Produto;
    inicialPosicalX?: number;
    finalPosicalX?: number;
    inicialPosicalY?: number;
    finalPosicalY?: number;
    width?: number;
    height?: number;
}

export class CatalogoPagina extends ModelID {
    catalogo?: Catalogo;
    pagina?: number;
    dataAlterado?: Date;
    catalogoPaginaProdutos?: CatalogoPaginaProduto[];
}

export class Catalogo extends ModelID {
    descricao?: string;
    observacao?: string;
    imagemUrl?: string;
    textoEmail?: string;
    tituloEmail?: string;
    dataCadastrado?: Date;
    dataAlterado?: Date;
    catalogoPaginas?: CatalogoPagina[];
}