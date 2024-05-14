import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}
interface ProductResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'http://localhost:8081/products'; // replace with your API URL

  constructor(private http: HttpClient) {}

  getProducts(page: any, size: any): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/pagination/${page}/${size}`);
  }
}
