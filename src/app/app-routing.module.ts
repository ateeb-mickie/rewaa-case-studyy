import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'order',
    loadChildren: () =>
      import('./orders/feature/order-shell/order-shell.module').then(
        (m) => m.OrderShellModule
      ),
  },
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
