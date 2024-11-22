import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {  SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const snackbarService = inject(SnackbarService)
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        console.log(error)
      if (error.status === 400) {
        snackbarService.openSnackBar(error?.error?.errors?.[0]?.keyword || 'error occured','ok')
      }
      return throwError(() => error);
    })
  );
};
