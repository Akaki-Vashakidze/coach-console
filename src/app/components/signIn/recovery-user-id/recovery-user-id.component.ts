import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import { UserType } from '../../../enums/enums';
import { SignInService } from '../../../services/sign-in.service';
import { RecoveryContactComponent } from "../recovery-contact/recovery-contact.component";

@Component({
  selector: 'app-recovery-user-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, RouterModule, RecoveryContactComponent],
  templateUrl: './recovery-user-id.component.html',
  styleUrl: './recovery-user-id.component.scss'
})
export class RecoveryUserIdComponent {
  recoverPassWithIdForm: FormGroup;
  constructor(private fb: FormBuilder, private _router:Router,private _signInService:SignInService) {
    this.recoverPassWithIdForm = this.fb.group({
      pidOrEmail: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.recoverPassWithIdForm.valid) {
      this._signInService.recoverPasswordinit({...this.recoverPassWithIdForm.value, userType:UserType.COACH}).subscribe(item => {
        console.log(item)
        localStorage.setItem('recoveryContactInfo',JSON.stringify(item))
        this._router.navigate(['/auth/recovery2'])
      })
    } else {
      console.error('Form is invalid');
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.recoverPassWithIdForm.get(controlName);
    return control?.hasError(error) && control?.touched || false;
  }
  
}
