import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './components/catalog/catalog.component';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    FormsModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule {}