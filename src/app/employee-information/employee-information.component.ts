import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalcuationResultDTO } from 'src/model/CalcuationResultDTO';
import { EmployeeDTO } from 'src/model/EmployeeDTO';
import { DeductionCalculationService } from 'src/service/deduction-calculation.service';

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Full Name',
  },
  {
    key: 'type',
    type: 'text',
    label: 'Type',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.scss']
})
export class EmployeeInformationComponent implements OnInit {

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = [{name: '',type: ''}];
  dependentType = ['Spouse', 'Child'];
  columnsSchema: any = COLUMNS_SCHEMA;
  calcuationResultDTO = new CalcuationResultDTO();
  
  constructor(private fb: FormBuilder, private deductionCalculationService:DeductionCalculationService,private router: Router){}
  
  formEmp = this.fb.group({
    name: new FormControl('', [Validators.required]),
    yearlySalary: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    noOfPayCheck: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(2)]),
  });

  ngOnInit() {
    this.dataSource.pop();
   }
  
   addRow(){
    const newRow = {
      name: '',
      type: '',
      isEdit: true,
    }
    this.dataSource = [newRow, ...this.dataSource];
    console.log(this.dataSource);
  }

  removeRow(rowid: number) {
    this.dataSource = this.dataSource.filter((item, index) => index !== rowid);
  }

  submit(){
    if(!this.formEmp.valid){
      return;
    }
    let employeeDTO = new EmployeeDTO();
    employeeDTO.name= !!this.formEmp.controls.name.value ? this.formEmp.controls.name.value:"";
    employeeDTO.yearlySalary=!!this.formEmp.controls.yearlySalary.value ? this.formEmp.controls.yearlySalary.value:"";
    employeeDTO.numberOfPaychecksPerYear=!!this.formEmp.controls.noOfPayCheck.value? this.formEmp.controls.noOfPayCheck.value:"";
    employeeDTO.dependents=this.dataSource;
    this.deductionCalculationService.getCalculateDeductions(employeeDTO).subscribe(res=>{
      debugger;
      this.calcuationResultDTO.TotalDeductionPerPayCheck=res.totalDeductionPerPayCheck,
      this.calcuationResultDTO.DependentsDeductionPerPayCheck=res.dependentsDeductionPerPayCheck,
      this.calcuationResultDTO.EmployeeDeductionPerPayCheck=res.employeeDeductionPerPayCheck,
      this.calcuationResultDTO.EmployeeDeductionPerYear=res.employeeDeductionPerYear,
      this.calcuationResultDTO.DependentsDeductionPerYear=res.dependentsDeductionPerYear,
      this.calcuationResultDTO.TotalDeductionPerYear=res.totalDeductionPerYear,
      this.calcuationResultDTO.EmployeePaycheckAfterDeductions=res.employeePaycheckAfterDeductions,
      this.calcuationResultDTO.EmployeeYearlyPayAfterDeductions=res.employeeYearlyPayAfterDeductions
      this.router.navigate(['/result'],{state:{data: this.calcuationResultDTO}});
    });
  }
}
