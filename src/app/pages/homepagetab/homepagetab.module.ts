import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagetabPageRoutingModule } from './homepagetab-routing.module';

import { HomepagetabPage } from './homepagetab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagetabPageRoutingModule
  ],
  declarations: [HomepagetabPage]
})
export class HomepagetabPageModule {}
