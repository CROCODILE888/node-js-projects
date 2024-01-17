import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1 >Welcome to {{title}}!</h1>
  </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Login project';
}
