import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input('product') product: any = {};
  @Output('hide') hideForm: EventEmitter<any> = new EventEmitter<any>();
  @Output('formInValid') formInValid: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  productForm!: FormGroup;
  formStatus: string = '';

  constructor(private fb: FormBuilder) {
    this.creatForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newProduct = changes['product'].currentValue;
    const form = this.createProductForm(newProduct);
    this.products.push(form);
  }

  ngOnInit(): void {}

  creatForm() {
    this.productForm = this.fb.group({
      products: this.fb.array([]),
      total: new FormControl<number>(0),
      totalTax: new FormControl<number>(0),
      totalTaxExc: new FormControl<number>(0),
      payNow: [true],
      paymentMethod: ['', Validators.required],
      paidAmount: new FormControl<number | null>(null, Validators.required),
      paymentDueDate: [this.formatDate(new Date()), Validators.required],
    });
    this.productForm.statusChanges.subscribe((res) => {
      if (res !== this.formStatus) {
        this.formStatus = res;
        if (this.formStatus === 'VALID') {
          this.formInValid.emit(false);
        } else {
          this.formInValid.emit(true);
        }
      }
    });
    this.payNow.valueChanges.subscribe((res) => {
      if (res) {
        this.paidAmount.enable();
        this.paymentMethod.enable();
      } else {
        this.paidAmount.patchValue(0)
        this.paidAmount.disable();
        this.paymentMethod.disable();
      }
    });
  }

  createProductForm(newProduct: any) {
    const form = this.fb.group({
      name: [newProduct.name],
      sku: [newProduct.sku],
      qty: new FormControl<number | null>(null, Validators.required),
      newCost: new FormControl<number | null>(null, Validators.required),
      taxCode: ['vat', Validators.required],
      availableQty: [newProduct.availableQty],
      totalCostExc: new FormControl<number>(0),
      expectedQty: new FormControl<number>(0),
      taxAmount: new FormControl<number>(newProduct.vatTaxAmount),
      lastBuyPrice: new FormControl<number>(newProduct.lastBuyPrice),
      totalCostInc: new FormControl<number>(0),
    });
    form.controls.qty.valueChanges.subscribe((res) => {
      this.handleChange(form);
    });
    form.controls.newCost.valueChanges.subscribe((res) => {
      this.handleChange(form);
    });
    form.controls.taxCode.valueChanges.subscribe((res) => {
      this.handleChange(form);
    });
    return form;
  }

  handleChange(form: any) {
    const controls = form.controls;
    const qty = controls.qty.value ? controls.qty.value : 0;
    const newCost = controls.newCost.value ? controls.newCost.value : 0;
    const taxToAdd =
      controls.taxCode.value === 'vat' ? controls.taxAmount.value : 0;
    const availableQty = controls.availableQty.value;
    if (qty !== 0 && newCost !== 0) {
      const { expectedQty, totalCostExc, totalCostInc } = this.updateValues(
        availableQty,
        qty,
        newCost,
        taxToAdd ? taxToAdd : 0
      );
      form.patchValue({
        expectedQty,
        totalCostExc,
        totalCostInc,
      });
      this.calculateTotalCost();
    }
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
    if (this.products.value.length === 0) {
      this.productForm.reset();
      this.hideForm.emit();
    }
  }

  updateValues(
    availableQty: number,
    qty: number,
    newCost: number,
    taxToAdd: number
  ) {
    return {
      expectedQty: availableQty === 0 ? 0 : availableQty + qty,
      totalCostExc: qty * newCost,
      totalCostInc: qty * newCost + taxToAdd,
    };
  }

  calculateTotalCost() {
    let total = 0;
    let totalTax = 0;
    let totalTaxExc = 0;
    this.products.controls.forEach((product) => {
      if (product.get('taxCode')?.value === 'vat') {
        totalTax += product.get('taxAmount')?.value;
      }
      total += product.get('totalCostInc')?.value;
      totalTaxExc += product.get('totalCostExc')?.value;
    });
    this.productForm.patchValue({ total, totalTax, totalTaxExc });
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  get payNow() {
    return this.productForm.get('payNow') as FormControl;
  }

  get products() {
    return this.productForm.get('products') as FormArray;
  }

  get total() {
    return this.productForm.get('total') as FormControl;
  }

  get paidAmount() {
    return this.productForm.get('paidAmount') as FormControl;
  }

  get paymentMethod() {
    return this.productForm.get('paymentMethod') as FormControl;
  }
}
