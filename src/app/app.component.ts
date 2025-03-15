import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'VoizAlarm';
  isAuthenticated = false; // Bandera de autenticación

  constructor(private router: Router) {
    // Detecta cambios en la ruta y verifica si el usuario está autenticado
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthentication();
      }
    });
  }

  checkAuthentication() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated'); // Borra la sesión
    this.router.navigate(['/login']);
  }
}
