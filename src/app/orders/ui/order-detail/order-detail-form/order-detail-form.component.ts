import {
  Component,
  ContentChild,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Observable, debounceTime, filter, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-order-detail-form',
  templateUrl: './order-detail-form.component.html',
  styleUrls: ['./order-detail-form.component.css'],
})
export class OrderDetailFormComponent implements OnInit {
  @ViewChild('supplierDropdown') supplierDropdown!: NgbDropdown;
  @ViewChild('locationDropdown') locationDropdown!: NgbDropdown;
  orderDetailForm!: FormGroup<any>;
  supplier$!: Observable<any>;
  location$!: Observable<any>;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.orderDetailForm = this.fb.group({
      supplierName: ['', Validators.required],
      location: ['', Validators.required],
      invoiceNumber: [''],
      notes: ['', Validators.maxLength(200)],
    });
    this.supplier$ = this.supplierName.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => {
        this.supplierDropdown.open();
        const obs = of([
          { name: 'abc' },
          { name: 'abb' },
          { name: 'bc' },
          { name: 'aac' },
          { name: 'aaa' },
        ]);
        return this.getAllLike(obs, value);
      })
    );
    this.location$ = this.location.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => {
        this.locationDropdown.open();
        const obs = of([
          { name: 'abc' },
          { name: 'abb' },
          { name: 'bc' },
          { name: 'aac' },
          { name: 'aaa' },
        ]);
        return this.getAllLike(obs, value);
      })
    );
  }

  getAllLike(obs: Observable<any>, value: string) {
    return obs.pipe(
      map((suppliers) =>
        suppliers.filter((supplier: any) => supplier.name === value)
      )
    );
  }

  get supplierName(): FormControl {
    return this.orderDetailForm.get('supplierName') as FormControl;
  }

  get location(): FormControl {
    return this.orderDetailForm.get('location') as FormControl;
  }

  get notes(): FormControl {
    return this.orderDetailForm.get('notes') as FormControl;
  }
}
