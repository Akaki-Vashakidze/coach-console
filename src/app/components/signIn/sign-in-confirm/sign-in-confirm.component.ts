import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { SignInService } from '../../../services/sign-in.service';

@Component({
  selector: 'app-sign-in-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,RouterModule],
  templateUrl: './sign-in-confirm.component.html',
  styleUrl: './sign-in-confirm.component.scss'
})
export class SignInConfirmComponent {
  tokenCodeForm: FormGroup;
  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService) {
    this.tokenCodeForm = this.fb.group({
      token: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(6)]],
    });
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.tokenCodeForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }

  confirmCode(){
    console.log(this.tokenCodeForm.value)
    let uuid = localStorage.getItem('coachUuid')
    this._signInService.recoverPasswordSubmit({...this.tokenCodeForm.value,uuid}).subscribe(item => {
      console.log(item)
      if(item.result.data){
        localStorage.setItem('coachData',JSON.stringify(item.result))
        this._router.navigate(['/auth/newPass'])
      }
      console.log(item)
    })
  }
}
