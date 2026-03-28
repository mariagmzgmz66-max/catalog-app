import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private jsonUrl = 'assets/productos.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl).pipe(
      map(products => this.buildHierarchy(products))
    );
  }

private buildHierarchy(products: Product[]): Product[] {
  const map = new Map<number, Product>();

  products.forEach(p => {
    map.set(p.id, { ...p, subProducts: [] });
  });

  map.forEach(product => {
    if (product.parent !== null && product.parent !== undefined) {
      const parent = map.get(product.parent);
      if (parent) {
        parent.subProducts!.push(product);
      }
    }
  });

  return Array.from(map.values());
}
}