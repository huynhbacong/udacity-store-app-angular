import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = {
    id: 0,
    fisrtname: '',
    lastname: '',
    username: '',
    password_digest: ''
  }

  @Output() signupSubmit: EventEmitter<User> = new EventEmitter();

  onSignup(): void {
    this.signupSubmit.emit(this.user);
  }
}
