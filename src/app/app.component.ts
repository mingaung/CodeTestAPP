import { Component } from '@angular/core';
import { TokenService } from 'src/service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Paylocity-App';
  constructor(private tokenService:TokenService){
    tokenService.getToken().subscribe(res=> 
    {
      debugger;
      sessionStorage.setItem("token",res.data);
    });
  }
}






