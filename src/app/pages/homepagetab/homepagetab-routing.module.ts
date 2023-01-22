import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepagetabPage } from './homepagetab.page';

const routes: Routes = [
  {
    path: '',
    component: HomepagetabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepagetabPageRoutingModule {}
