import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'admin@example.com';  // Pre-llenado
  password: string = '123456';          // Pre-llenado

  constructor(private router: Router) {}

  goToHome(): void {
    console.log(`Intentando login con: ${this.email} / ${this.password}`);

    if (this.email && this.password) { // Solo verifica que haya algo escrito
      localStorage.setItem('isAuthenticated', 'true'); // Guarda estado
      this.router.navigate(['/home']).then(() => {
        window.location.reload(); // Recarga la página para reflejar el navbar
      });
    } else {
      alert('Ingrese credenciales válidas');
    }
  }
}
