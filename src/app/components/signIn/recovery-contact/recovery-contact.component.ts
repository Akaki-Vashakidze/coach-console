import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { UserType } from '../../../enums/enums';
import { SignInService } from '../../../services/sign-in.service';

@Component({
  selector: 'app-recovery-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,RouterModule],
  templateUrl: './recovery-contact.component.html',
  styleUrl: './recovery-contact.component.scss'
})
export class RecoveryContactComponent {
  sendCodeForm: FormGroup;
  mobileForm: FormGroup;
  userContactInfo!:{email:string, phone:string} | null;
  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService) {
    this.userContactInfo = JSON.parse(localStorage.getItem('recoveryContactInfo') || '');
    this.sendCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.mobileForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.sendCodeForm.valid) {
      console.log(this.sendCodeForm.value)
      // this._signInService.recoverPasswordinit({...this.sendCodeForm.value, userType:UserType.COACH}).subscribe(item => {
      //   console.log(item)
      // })
    } else {
      console.error('Form is invalid');
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.sendCodeForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }

  sendCode(){
    console.log(this.mobileForm.value)
  }
  
}
