import { Component, OnInit } from '@angular/core';
import { ItensPedido } from 'src/app/models/itensPedido.model';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css'],
})
export class AddPedidoComponent implements OnInit{
  pedido: Pedido = {
    id: 0,
    nomeCliente: '',
    emailCliente: '',
    pago: false,
    lista: []
  };
  submitted = false;
  
  produtos: any[] = [
  ];
  produtoSelecionado: number | undefined;

  novoItem: ItensPedido = {
    id: undefined,
    nomeProduto: '',
    quantidade: 0,
    valorUnitario: 0,
    idProduto: undefined
  };
  
  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.getProducts().subscribe(
      (data) => {
        this.produtos = data;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  savePedido(): void {
    const data = {
      nomeCliente: this.pedido.nomeCliente,
      emailCliente: this.pedido.emailCliente,
      pago: this.pedido.pago,
      itensPedidos: this.pedido.lista
    };
  
    this.pedidoService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
    this.newPedido();
  }
  updateValoresItem(novoItem: ItensPedido, valorUnitario: number, quantidade: number): void {
    novoItem.valorUnitario = valorUnitario;
    novoItem.quantidade = quantidade;
  }

  removerItem(index: number): void {
    this.pedido.lista?.splice(index, 1);
  }
  
  addNovoItem(): void {
    const produtoSelecionado = this.produtos.find(produto => produto.id === Number(this.produtoSelecionado));
    
    if (produtoSelecionado) {
      const novoItem: ItensPedido = {
        id: undefined,
        nomeProduto: produtoSelecionado.nomeProduto,
        quantidade: this.novoItem.quantidade,
        valorUnitario: produtoSelecionado.valor,
        idProduto: produtoSelecionado.id
      };
  
      this.pedido.lista?.push(novoItem);
    } else {
      console.error('Produto não encontrado.');
    }
  }
  
  newPedido(): void {
    this.produtoSelecionado = undefined;
    this.submitted = false;
    this.pedido = {
      id: 0,
      nomeCliente: '',
      emailCliente: '',
      pago: false,
      lista: [{
        id: undefined,
        nomeProduto: '',
        quantidade: 0,
        valorUnitario: 0,
        idProduto: undefined
      }]
    };
    this.novoItem = {
      id: undefined,
      nomeProduto: '',
      quantidade: 0,
      valorUnitario: 0,
      idProduto: undefined
    };
  }
}
