import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalcuationResultDTO } from 'src/model/CalcuationResultDTO';

@Component({
  selector: 'app-calculate-result',
  templateUrl: './calculate-result.component.html',
  styleUrls: ['./calculate-result.component.scss']
})
export class CalculateResultComponent implements OnInit {

  data:any;
  constructor(private router: Router) {
    debugger; 
    this.data = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.data.EmployeeDeductionPerPayCheck);
  }

  ngOnInit(): void {
  }
}
