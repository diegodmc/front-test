import { Component, Input, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { ItensPedido } from 'src/app/models/itensPedido.model';

@Component({
  selector: 'app-pedido-details',
  templateUrl: './pedido-details.component.html',
  styleUrls: ['./pedido-details.component.css'],
})
export class PedidoDetailsComponent {
  @Input() viewMode = false;

  @Input() currentPedido: Pedido = {
    id: 0,
    nomeCliente: '',
    emailCliente: '',
    pago: false,
    lista: [] as ItensPedido[] 
  };

  message = '';

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getPedido(this.route.snapshot.params['id']);
    }
  }

  getPedido(id: string): void {
    this.pedidoService.get(id).subscribe({
      next: (data) => {
        this.currentPedido = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePago(status: boolean): void {
    const data = {
      nomeCliente: this.currentPedido.nomeCliente,
      emailCliente: this.currentPedido.emailCliente,
      pago: this.currentPedido.pago,
      lista: this.currentPedido.lista
    };

    this.message = '';

    this.pedidoService.update(this.currentPedido.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentPedido.pago = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updatePedido(): void {
    this.message = '';

    this.pedidoService
      .update(this.currentPedido.id, this.currentPedido)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This pedido was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deletePedido(): void {
    this.pedidoService.delete(this.currentPedido.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/pedidos']);
      },
      error: (e) => console.error(e)
    });
  }
}