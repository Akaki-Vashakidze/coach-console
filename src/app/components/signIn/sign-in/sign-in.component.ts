import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../services/auth.service';
import { SignInService } from '../../../services/sign-in.service';
import { UserType } from '../../../enums/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService) {
    this.signInForm = this.fb.group({
      pidOrEmail: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      console.log('Submitted:', { username, password });
      this._signInService.login({...this.signInForm.value, userType:UserType.COACH}).subscribe(item => {
        console.log(item)
        this._router.navigate(['/dashboard'])
      })
    } else {
      console.error('Form is invalid');
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.signInForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }
  
}
