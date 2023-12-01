import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPedidoComponent } from './components/add-pedido/add-pedido.component';
import { PedidoDetailsComponent } from './components/pedido-details/pedido-details.component';
import { PedidoListComponent } from './components/pedido-list/pedido-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPedidoComponent,
    PedidoDetailsComponent,
    PedidoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }