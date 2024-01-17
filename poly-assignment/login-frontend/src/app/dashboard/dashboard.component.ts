import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  template: `
    <p>
      dashboard works!
    </p>
  `,
  styles: ``
})
export class DashboardComponent  {
  message: string='';

  constructor(private http: HttpClient){}

  // ngOnInit(): void {
  //     this.http.get<any>('http://localhost:3000/dashboard').subscribe(
  //       (response)=>{
  //         this.message= response.message;
  //       },
  //       (error)=>{
  //         console.error(error);
  //       }
  //     )
  // }
}
