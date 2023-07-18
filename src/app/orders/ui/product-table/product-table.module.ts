import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table/product-table.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductTableComponent,
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductTableComponent
  ]
})
export class ProductTableModule { }
