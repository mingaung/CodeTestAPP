import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeDTO } from 'src/model/EmployeeDTO';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class DeductionCalculationService {
  private options={ headers:new HttpHeaders().set('Content-Type','application/json'),withCredentials:false};
  apiUrl = "https://localhost:44387/api/EmployeeDeduction/CalculateDeductions"; 
  constructor(private http: HttpClient) { 
  }
  getCalculateDeductions(employeeDTO: EmployeeDTO):Observable<any>{
    const body=JSON.stringify(employeeDTO);
    debugger;
    //return this.http.get('https://localhost:44387/api/EmployeeDeduction/getTest').pipe();
    return this.http.post<EmployeeDTO>(this.apiUrl, employeeDTO,this.options).pipe();
  }
}
