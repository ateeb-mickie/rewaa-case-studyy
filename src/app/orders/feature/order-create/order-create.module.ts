import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderCreateRoutingModule } from './order-create-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderDetailModule } from '../../ui/order-detail/order-detail.module';
import { CardWrapperModule } from 'src/app/shared/ui/card-wrapper/card-wrapper.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductTableModule } from '../../ui/product-table/product-table.module';


@NgModule({
  declarations: [
    CreateOrderComponent,
  ],
  imports: [
    CommonModule,
    OrderCreateRoutingModule,
    OrderDetailModule,
    CardWrapperModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    ProductTableModule
  ]
})
export class OrderCreateModule { }
