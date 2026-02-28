import { Component, inject, output } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register() {
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log('Registration successful:', response);
        this.cancel();
      },
      error: error => {
        console.error('Registration failed:', error);
      }
    })
  }

  cancel() {
    this.creds = {} as RegisterCreds;
    this.cancelRegister.emit(false);
  }
}
