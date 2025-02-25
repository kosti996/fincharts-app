import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = 'r_test@fintatech.com';
  password: string = 'kisfiz-vUnvy9-sopnyv';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.access_token);
        this.router.navigate(['historical-chart']);
      },
      error: (err) => {
        console.error('get token failed', err);
      }
    });
  }
}
