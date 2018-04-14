import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model = {};

  isCollapsed = false;
  constructor(public AuthService: AuthService) { }

  ngOnInit() {
  }


  login() {
    console.log(this.model);
    this.AuthService.login(this.model).subscribe(data => console.log(data), error => console.log(error));
    return this.verifyLogin();
  }

  verifyLogin() {
    return this.AuthService.IsExpired();
  }

  logout() {
    this.AuthService.LogOut();
  }
  
}
