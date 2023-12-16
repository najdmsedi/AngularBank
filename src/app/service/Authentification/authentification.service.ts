import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('id') !== null;
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login page if not logged in
      return false;
    }

    return true;
    
  }

}
