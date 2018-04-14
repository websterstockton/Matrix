import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model = {};
  constructor(public AuthService: AuthService) { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
    this.AuthService.register(this.model).subscribe(data => console.log(data), error => console.log(error));
  }
}
