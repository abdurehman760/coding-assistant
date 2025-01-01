import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: '<h1>{{ title }}</h1>',
  styles: ['h1 { font-family: Lato; }']
})
export class HeaderComponent {
  title = '[object Object]';
}