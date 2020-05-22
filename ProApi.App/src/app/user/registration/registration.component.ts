import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(
    private authService: AuthService,
    public router: Router,
    public fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.validation();
  }

  validation()
    {
      this.registerForm = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        passwords: this.fb.group({
          password: ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword: ['', Validators.required]
        }, {validators: this.comparePasswords})
      });
  }

  comparePasswords(fb: FormGroup){
    const confirmPasswordCtrl = fb.get('confirmPassword');
    if (confirmPasswordCtrl.errors == null || 'mismatch' in confirmPasswordCtrl.errors){
      if (fb.get('password').value !== confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({mismatch: true});
      } else {
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }
  registerUser(){
    if (this.registerForm.valid) {
      this.user = Object.assign(
        { password: this.registerForm.get('passwords.password').value },
        this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
          this.toastr.success('Registration complete');
        }, error => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Duplicate Registration!');
                break;
              default:
                this.toastr.error(`Registration Error! CODE: ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }
}

