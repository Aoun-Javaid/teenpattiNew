import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth:AuthService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value.toLowerCase();
      const password = this.loginForm.get('password')?.value;
  
      this.auth.login(username, password).subscribe(
        (resp) => {
          localStorage.setItem("token", resp.data.accessToken);
          const currentTime = new Date();
          const userDetails = {
            data: resp.data.userDetail,
            timestamp: currentTime.toISOString(),
          };
          localStorage.setItem("userDetail", JSON.stringify(userDetails));
          this.router.navigate(["/"]);
          console.log('Login successful:', resp);
          this.toastr.success('Login successful!', 'Success');
        },
        (error) => {
          console.error('Login failed:', error);
          this.toastr.error('Login failed.', 'Error');
        }
      );
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  
}
}