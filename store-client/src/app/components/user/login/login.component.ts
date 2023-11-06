import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserBase } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() loginError: string = '';
  username: string = '';
  password: string = '';

  @Output() loginSubmit: EventEmitter<UserBase> = new EventEmitter();

  onLogin(): void {
    const user: UserBase = {
      username: this.username,
      password_digest: this.password
    }

    this.loginSubmit.emit(user);
  }
}
