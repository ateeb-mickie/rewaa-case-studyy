import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderLayoutComponent } from '../../ui/order-layout/order-layout.component';

const routes: Routes = [
  {
    path: '',
    component: OrderLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../order-create/order-create.module').then(
            (m) => m.OrderCreateModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderShellRoutingModule {}
