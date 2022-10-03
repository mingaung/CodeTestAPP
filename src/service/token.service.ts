import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  apiUrl = "https://localhost:44387/api/GenerateToken/GenerateJwtToken";
  headers= new HttpHeaders()
  .set('Audience', 'paylocityAPP')
  
  public token:string;

  constructor(private http: HttpClient) { 
    var tokenKey = sessionStorage.getItem("token");
    if(tokenKey)
    {
      this.token=tokenKey;
    }
  }

  getToken():Observable<any>{
      return this.http.get(this.apiUrl,{ 'headers': this.headers }).pipe();
  }

}
