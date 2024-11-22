import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SessionData, User } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';
import { SignInService } from '../../services/sign-in.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 @Input() menuItems!:{title:string, action:string}[]
 userData!:SessionData;
 constructor(private sessionService:SessionService,private _router:Router, private signInService:SignInService ){
  this.userData = sessionService.getSessionData()
 }

 onMenuItemClick( action: string) {
  switch (action) {
    case 'log_out':
      this.logout();
      break;
    case 'profile':
      // this.navigateToProfile();
      break;
    default:
      console.warn('Unknown action:', action);
  }
}

logout(){
    this.signInService.logout().subscribe(item => {
      console.log(item)
      if(item.result.data) {
        this._router.navigate(['/auth/signIn'])
      }
    })
}
}
