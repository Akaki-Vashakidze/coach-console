import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SessionData, User } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';


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
 constructor(private sessionService:SessionService){
  console.log(sessionService.getSessionData())
  this.userData = sessionService.getSessionData()
 }

 onMenuItemClick( action: string) {
  console.log(action)
  switch (action) {
    case 'logout':
      // this.logout();
      break;
    case 'profile':
      // this.navigateToProfile();
      break;
    default:
      console.warn('Unknown action:', action);
  }
}
}
