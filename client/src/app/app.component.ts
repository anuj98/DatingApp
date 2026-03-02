import { Component, inject } from '@angular/core';
import { NavComponent } from "../layout/nav/nav.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent, RouterOutlet]
})
export class AppComponent{
  protected router = inject(Router);
  protected title = 'Dating app';
}
