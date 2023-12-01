import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css'],
})
export class PedidoListComponent {
  pedidos?: Pedido[];
  currentPedido: Pedido = {};
  currentIndex = -1;
  title = '';

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.retrievePedidos();
  }

  retrievePedidos(): void {
    this.pedidoService.getAll().subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  retrievePedido(nome: any): void {
    this.pedidoService.getAll().subscribe({
      next: (data) => {
        this.pedidos = data.filter(e => e.nomeCliente == nome);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrievePedidos();
    this.currentPedido = {};
    this.currentIndex = -1;
    this.title = '';
  }

  refreshPedido(nome :any): void {
    this.retrievePedido(nome);
    this.currentPedido = {};
    this.currentIndex = -1;
  }

  setActivePedido(pedido: Pedido, index: number): void {
    this.currentPedido = pedido;
    this.currentIndex = index;
  }

  removePedidoById(): void {
    if (this.currentPedido && this.currentPedido.id) {
      this.pedidoService.delete(this.currentPedido.id)
        .subscribe(
          () => {
            console.log('Pedido removido com sucesso!');
          },
          (error) => {
            console.error('Erro ao remover o pedido:', error);
          }
        );
    }
    this.refreshList();
  }
  searchTitle(): void {
    this.currentPedido = {};
    this.currentIndex = -1;

    this.pedidoService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    this.refreshPedido(this.title);
  }
  
}