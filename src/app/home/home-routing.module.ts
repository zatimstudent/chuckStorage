import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children:[
      {
        path: 'homepagetab',
        children: [
          {
            path:'',
            loadChildren: () => import('../pages/homepagetab/homepagetab.module').then( m => m.HomepagetabPageModule)
          }
        ]
      },

      {
        path: 'favoritestab',
        children: [
          {
            path:'',
            loadChildren: () => import('../pages/favoritestab/favoritestab.module').then( m => m.FavoritestabPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/homepagetab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/homepagetab',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
