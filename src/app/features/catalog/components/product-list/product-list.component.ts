import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../core/models/product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() selectedRightId: number | null = null;
  @Input() animationDirection: 'left' | 'right' = 'left';

  @Output() productSelected = new EventEmitter<Product>();

  isSelectable(product: Product): boolean {
    return !!(product.subProducts && product.subProducts.length > 0);
  }

  selectProduct(product: Product) {
    if (this.isSelectable(product)) {
      this.productSelected.emit(product);
    }
  }
}