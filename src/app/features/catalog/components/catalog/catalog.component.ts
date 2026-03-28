import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ProductApiService } from '../../../../core/services/product-api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  categories: Product[] = [];
  allProducts: Product[] = [];
  selectedProducts: Product[] = [];
  selectedCategory?: Product;

  navigationStack: Product[] = []; // historial completo de productos/subcategorías
  selectedLeftId: number | null = null;
  selectedRightId: number | null = null;

  animationDirection: 'left' | 'right' = 'left'; // para animar la columna derecha

  constructor(private productService: ProductApiService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.categories = products.filter(p => !p.parent && !p.category_id);
    });
  }

  /** Selección de categoría inicial */
  selectCategory(category: Product): void {
    this.selectedCategory = category;
    this.navigationStack = [];
    this.selectedProducts = this.getProductsByCategory(category.id);
    this.selectedLeftId = category.id;
    this.selectedRightId = null;
    this.animationDirection = 'left';
  }

  /** Selección de producto/subcategoría en la columna derecha */
  selectProduct(product: Product): void {
    if (!this.isSelectable(product)) return;

    this.navigationStack.push(product);
    this.selectedLeftId = product.id;
    this.selectedProducts = product.subProducts || [];
    this.selectedRightId = null;
    this.animationDirection = 'left';
  }

  /** Radio columna derecha */
  selectRightRadio(product: Product): void {
    this.selectedRightId = product.id;
    this.selectProduct(product);
  }

  /** Radio columna izquierda */
  selectLeftRadio(product: Product): void {
    this.selectedLeftId = product.id;
    this.selectedProducts = product.subProducts || [];
    this.selectedRightId = null;
    this.animationDirection = 'left';
  }

  /** Botón ATRÁS */
  goBack(): void {
    if (!this.navigationStack.length) return;

    this.navigationStack.pop();
    this.animationDirection = 'right';

    if (this.navigationStack.length === 0) {
      // volvemos a la categoría inicial
      this.selectedProducts = this.getProductsByCategory(this.selectedCategory!.id);
      this.selectedLeftId = this.selectedCategory!.id;
      this.selectedRightId = null;
    } else {
      // mostramos el último subproducto
      const last = this.navigationStack[this.navigationStack.length - 1];
      this.selectedProducts = last.subProducts || [];
      this.selectedLeftId = last.id;
      this.selectedRightId = null;
    }
  }

  /** Determinar si un producto tiene subproductos (seleccionable) */
  isSelectable(product: Product): boolean {
    return !!(product.subProducts && product.subProducts.length > 0);
  }

  /** Obtener productos de una categoría */
  getProductsByCategory(categoryId: number): Product[] {
    return this.allProducts.filter(
      p => p.category_id?.includes(categoryId) && !p.parent
    );
  }
}