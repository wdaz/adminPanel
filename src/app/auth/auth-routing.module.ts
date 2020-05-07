import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SinginComponent } from './singin/singin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'singin',
  },
  {
    path: 'singin',
    component: SinginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
