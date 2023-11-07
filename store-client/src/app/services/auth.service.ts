import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserBase } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  userRoute = 'user';
  isCartRouter: boolean = false;
  private token$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.token$.next(localStorage.getItem('access_token') ?? '');
  }

  login(user: UserBase): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${this.userRoute}/login`, user);
  }

  createUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${this.userRoute}`, user);
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
    this.token$.next(token);
  }

  getToken(): Observable<string> {
    return this.token$.asObservable();
  }

}
