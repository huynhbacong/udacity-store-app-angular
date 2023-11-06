import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserBase } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginSubmit(user: UserBase): void {
    console.log(user);
    this.authService.login(user).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.authService.setToken(res);
          if (this.authService.isCartRouter) {
            this.router.navigate(['/cart']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        this.loginError = err.error;
        console.log('respseon erre', err);
      },
    });
  }

  signupSubmit(user: User): void {
    console.log(user);
    this.authService.createUser(user).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.authService.setToken(res);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.loginError = err.error;
        console.log('respseon erre', err);
      },
    });
  }
}
