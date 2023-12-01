import { ItensPedido } from "./itensPedido.model";

export class Pedido {
    id?: any;
    nomeCliente?: string;
    emailCliente?: string;
    pago?: boolean;
    lista?: ItensPedido[]
  }
