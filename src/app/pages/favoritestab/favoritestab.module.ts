import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritestabPageRoutingModule } from './favoritestab-routing.module';

import { FavoritestabPage } from './favoritestab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritestabPageRoutingModule
  ],
  declarations: [FavoritestabPage]
})
export class FavoritestabPageModule {}
