import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { Produto } from '../models/product.model';

const baseUrl = 'http://localhost:5063/api';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${baseUrl}/pedido-all`);
  }

  get(id: any): Observable<Pedido> {
    return this.http.get<Pedido>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/order/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/order/${id}`);
  }

  findByTitle(name: any): Observable<any> {
    return this.http.post<Pedido[]>(`${baseUrl}/get-by-name`, {nomeCliente: name});
  }

  getProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${baseUrl}/product-all`, { withCredentials: true });
  }
}