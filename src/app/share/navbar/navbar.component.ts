import { Component } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated = false; 

  constructor(private router: Router) {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated'); // Borra la sesión
    this.router.navigate(['/login']);
  }

}
