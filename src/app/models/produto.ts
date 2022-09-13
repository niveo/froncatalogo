import { ModelID } from "./base";

export class Produto  extends ModelID{
    referencia?: string;
    descricao?: string;
    dataCadastrado?: Date;
    dataAlterado?: Date;
}