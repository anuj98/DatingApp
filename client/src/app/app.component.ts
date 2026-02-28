import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountService } from '../core/services/account.service';
import { HomeComponent } from "../features/home/home.component";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavComponent, HomeComponent]
})
export class AppComponent implements OnInit{
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected title = 'Dating app';
  protected members = signal<User[]>([]);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    }
    catch (error) {
      throw error;
    }
  }
}
