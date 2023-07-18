import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailFormComponent } from './order-detail-form/order-detail-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardWrapperModule } from 'src/app/shared/ui/card-wrapper/card-wrapper.module';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    OrderDetailFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardWrapperModule,
    NgbDropdownModule,
  ],
  exports: [
    OrderDetailFormComponent
  ]
})
export class OrderDetailModule { }
