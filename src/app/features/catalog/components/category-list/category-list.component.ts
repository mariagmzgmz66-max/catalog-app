import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../core/models/product.model';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
   styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input() categories: Product[] = [];
  @Input() selectedCategoryId?: number;
  @Output() categorySelected = new EventEmitter<Product>();

  selectCategory(category: Product) {
    this.categorySelected.emit(category);
  }
}