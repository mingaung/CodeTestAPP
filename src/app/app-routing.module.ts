import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculateResultComponent } from './calculate-result/calculate-result.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';

const routes: Routes = [
  { path: '', component: EmployeeInformationComponent },
  { path: 'result', component: CalculateResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
