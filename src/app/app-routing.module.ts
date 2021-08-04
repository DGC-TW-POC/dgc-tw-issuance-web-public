import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseVaccinationDoseComponent } from './choose-vaccination-dose/choose-vaccination-dose.component';
import { LoginComponent } from './login/login.component';
import { VaccineApplyComponent } from './vaccine-apply/vaccine-apply.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'choose-vaccination-dose' ,
    component : ChooseVaccinationDoseComponent
  },
  {
    path: 'vaccine-apply',
    component: VaccineApplyComponent
  } ,
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
