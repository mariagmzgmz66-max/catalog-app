import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ProductApiService } from '../../../../core/services/product-api.service';
import { signal, computed } from '@angular/core';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
categories = signal<Product[]>([]);
selectedCategory = signal<Product | null>(null);
navigationStack = signal<Product[]>([]);
animationDirection = signal<'left' | 'right'>('left');

searchQuery = signal(''); // para el texto del buscador

constructor(private productService: ProductApiService) {}

ngOnInit(): void {
  this.productService.getProducts().subscribe(products => {
    // Categorías principales: no tienen padre
    const mainCategories = products.filter(p => !p.parent);
    this.categories.set(mainCategories);
  });
}
get searchText(): string {
  return this.searchQuery();
}
set searchText(value: string) {
  this.searchQuery.set(value);
}
// Productos filtrados según el buscador
filteredProducts = computed(() => {
  const query = this.searchQuery().toLowerCase().trim();

  // Solo filtra si hay categoría seleccionada y query >= 3
  if (!this.selectedCategory() || query.length < 3) {
    return this.selectedProducts();
  }

  return this.selectedProducts().filter(product =>
    product.name.toLowerCase().includes(query)
  );
});
currentProduct = computed(() => {
  const stack = this.navigationStack();
  return stack.length ? stack[stack.length - 1] : null;
});
selectedProducts = computed(() => {
  const current = this.currentProduct();
  if (current) return current.subProducts || [];

  const category = this.selectedCategory();
  if (category) {
    // Mostrar productos que tienen esta categoría como category_id
    return this.categories()
      .flatMap(cat => cat.subProducts || [])
      .filter(p => p.category_id?.includes(category.id));
  }

  return [];
});
selectedLeftId = computed(() => {
  return this.currentProduct()?.id ?? this.selectedCategory()?.id ?? null;
});
 onCategorySelected(category: Product) {
  this.selectedCategory.set(category);
  this.navigationStack.set([]);
  this.animationDirection.set('left');
}
onProductSelected(product: Product) {
  this.navigationStack.update(stack => [...stack, product]);
  this.animationDirection.set('left');
}
goBack() {
  this.navigationStack.update(stack => stack.slice(0, -1));
  this.animationDirection.set('right');

  // Reset scroll columna derecha
  const rightCol = document.querySelector('.product-column');
  if (rightCol) rightCol.scrollTop = 0;
}



}