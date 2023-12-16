import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient, public router: Router) {}

  Login(data: User): Observable<number> {
    return this._httpClient.post<number>( `http://localhost:8080/user/login`,data);
  }
  
}
