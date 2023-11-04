import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'localhost:3000';
  userRoute = 'user';
  constructor(private http: HttpClient) { }

  login(user: User): Observable<string> {
    const username = user.username;
    const password_digest = user.password_digest;
    return this.http.post<string>(`${this.baseUrl}/${this.userRoute}/login`, {username, password_digest});
  }

  createUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${this.userRoute}`, user);
  }

}
