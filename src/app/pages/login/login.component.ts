import { Component } from '@angular/core';
import { SharedModule } from '../../core/shared/shared.module';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    user_name: new FormControl('admin', [Validators.required]),
    password: new FormControl('password', [Validators.required]),
  });
  constructor(private router: Router){}
  
  onSubmit() {
    this.router.navigate(['/employees']);
    return;}
}
