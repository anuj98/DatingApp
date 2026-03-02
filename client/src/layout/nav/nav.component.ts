import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected accountService = inject(AccountService);
  private toast = inject(ToastService);
  private router = inject(Router);
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.creds = {};
        this.toast.success('Login successful');
      },
      error: error => {
        console.log(error);
        this.toast.error('Login failed');
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.toast.success('Logout successful');
    this.router.navigateByUrl('/');
  }
}
