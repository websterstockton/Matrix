import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUser } from '../models/authenticatedUser';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  baseUrl = 'http://matrix4135.azurewebsites.net';
  constructor(private http: HttpClient, private JwtHelperService: JwtHelperService) { }

  register(model) {
    return this.http.post<AuthUser>(this.baseUrl + 'register', model);
  }

  login(user) {
    return this.http.post<AuthUser>(this.baseUrl + 'login', user)
      .map((result: AuthUser) => {
        if (result) {
          localStorage.setItem('token', result.tokenString);
          localStorage.setItem('user', JSON.stringify(result.user));
          console.log('token');
        }
        return result;
      });
  }

  IsExpired() {
    return this.JwtHelperService.isTokenExpired();
  }

  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
  }

}
