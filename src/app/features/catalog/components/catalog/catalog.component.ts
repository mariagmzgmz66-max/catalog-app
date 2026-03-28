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

  navigationStack: Product[] = [];
  selectedLeftId: number | null = null;
  selectedRightId: number | null = null;
  animationDirection: 'left' | 'right' = 'left';

  constructor(private productService: ProductApiService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.categories = products.filter(p => !p.parent && !p.category_id);
    });
  }

  /** Seleccionar categoría inicial */
  onCategorySelected(category: Product) {
    this.selectedCategory = category;
    this.navigationStack = [];
    this.selectedProducts = this.getProductsByCategory(category.id);
    this.selectedLeftId = category.id;
    this.selectedRightId = null;
    this.animationDirection = 'left';
  }

  /** Seleccionar producto/subcategoría */
  onProductSelected(product: Product) {
    this.navigationStack.push(product);
    this.selectedLeftId = product.id;
    this.selectedProducts = product.subProducts || [];
    this.selectedRightId = null;
    this.animationDirection = 'left';
  }

  /** Botón Atrás */
  goBack(): void {
    if (!this.navigationStack.length) return;

    this.navigationStack.pop();
    this.animationDirection = 'right';

    if (!this.navigationStack.length) {
      this.selectedProducts = this.getProductsByCategory(this.selectedCategory!.id);
      this.selectedLeftId = this.selectedCategory!.id;
      this.selectedRightId = null;
    } else {
      const last = this.navigationStack[this.navigationStack.length -1];
      this.selectedProducts = last.subProducts || [];
      this.selectedLeftId = last.id;
      this.selectedRightId = null;
    }
  }


  getProductsByCategory(categoryId: number): Product[] {
    return this.allProducts.filter(
      p => p.category_id?.includes(categoryId) && !p.parent
    );
  }
}