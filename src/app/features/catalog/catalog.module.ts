import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [CatalogComponent, SearchBarComponent,   CategoryListComponent, ProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule {}