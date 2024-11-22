import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirm-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule,RouterModule],
  templateUrl: './confirm-code.component.html',
  styleUrl: './confirm-code.component.scss'
})
export class ConfirmCodeComponent {

  sendCodeForm: FormGroup;
  constructor(private fb: FormBuilder,){
    this.sendCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
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
}
