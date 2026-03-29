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
  const categories: Product[] = products.filter(p => !p.parent && !p.category_id); // Categorías principales
  const productsWithoutParent: Product[] = products.filter(p => p.parent || p.category_id); // Productos base y subproductos

  // Crear un mapa para asociar subproductos a su padre
  const productMap = new Map<number, Product>();
  productsWithoutParent.forEach(p => productMap.set(p.id, { ...p, subProducts: [] }));

  // Asignar subproductos a su padre
  productMap.forEach(product => {
    if (product.parent) {
      const parent = productMap.get(product.parent);
      if (parent) parent.subProducts!.push(product);
    }
  });

  // Asignar productos base a la categoría
  categories.forEach(category => {
    const productsForCategory = productsWithoutParent.filter(
      p => p.category_id?.includes(category.id) && !p.parent
    );
    category.subProducts = productsForCategory.map(p => productMap.get(p.id)!);
  });

  return categories;
}
}