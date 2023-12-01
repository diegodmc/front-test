import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPedidoComponent } from './components/add-pedido/add-pedido.component';
import { PedidoDetailsComponent } from './components/pedido-details/pedido-details.component';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
  { path: 'pedidos', component: PedidoListComponent },
  { path: 'pedidos/:id', component: PedidoDetailsComponent },
  { path: 'add', component: AddPedidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }