import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Observable, debounceTime, iif, map, of, switchMap } from 'rxjs';
import { OrderDetailFormComponent } from 'src/app/orders/ui/order-detail/order-detail-form/order-detail-form.component';
import { ProductTableComponent } from 'src/app/orders/ui/product-table/product-table/product-table.component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit {
  @ViewChild('orderDetailForm') orderDetailForm!: OrderDetailFormComponent;
  @ViewChild('productsFormTable') productsFormTable!: ProductTableComponent;
  @ViewChild('productDropdown') productDropdown!: NgbDropdown;

  productName: FormControl = new FormControl('');
  productProp: any = {};
  product$!: Observable<any>;
  renderProductTable: boolean = false;
  disableCompleteOrder: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.product$ = this.productName.valueChanges.pipe(
      debounceTime(300),
      switchMap((v) => {
        return iif(
          () => v !== '',
          of([
            {
              name: 'iphone 14',
              sku: '1239012',
              availableQty: 10,
              vatTaxAmount: 100,
              lastBuyPrice: 90,
            },
            {
              name: 'iphone 13',
              sku: '512345123',
              availableQty: 9,
              vatTaxAmount: 100,
              lastBuyPrice: 90,
            },
            {
              name: 'iphone 12',
              sku: '234234234',
              availableQty: 100,
              vatTaxAmount: 100,
              lastBuyPrice: 90,
            },
            {
              name: 'iphone x',
              sku: '123123123',
              availableQty: 101,
              vatTaxAmount: 100,
              lastBuyPrice: 90,
            },
            {
              name: 'iphone 8',
              sku: '123123123',
              availableQty: 102,
              vatTaxAmount: 100,
              lastBuyPrice: 90,
            },
          ]).pipe(
            map((products) => {
              this.productDropdown.open();
              return products.filter(
                (product: any) =>
                  product.name.includes(v?.toLowerCase()) ||
                  product.sku?.includes(v?.toLowerCase())
              );
            })
          ),
          of([])
        );
      })
    );
  }

  onFormValid(event: any) {
    const orderFormValid = this.orderDetailForm.orderDetailForm.invalid;
    const productFormValid = event
    this.disableCompleteOrder =  productFormValid;
  }

  onCompleteOrder() {
    const payLoadOrder = this.orderDetailForm.orderDetailForm.value;
    const payLoadProducts = this.productsFormTable.productForm.value;
    const payload = {
      order: payLoadOrder,
      product: payLoadProducts
    }
    /* 
      this payload will be used in a post http request to be sent to the server
    */
  }

  onProductSelect(product: any) {
    this.renderProductTable = true;
    this.productProp = { ...product };
    this.productName.reset();
  }
}
