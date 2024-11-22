import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SessionData, Team, User } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';
import { SignInService } from '../../services/sign-in.service';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';


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
 teams = signal<Team[]>([{description:'',title:'',_id:''}])
 chosenTeam = signal<Team>({description:'',title:'',_id:''})
 constructor(private sessionService:SessionService,private _router:Router, private teamService:TeamService ,private signInService:SignInService ){
  this.userData = sessionService.getSessionData()
  let userId = this.userData?.user?.userId
  teamService.getCoachTeams(userId).subscribe(teams => {
    this.teams.set(teams)
  })
  this.chosenTeam.set(this.teamService.getChosenTeam())
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
      if(item.result.data) {
        this._router.navigate(['/auth/signIn'])
      }
    })
}

teamSwitch(team:Team){
  this.teamService.setChosenTeam(team)
  this.chosenTeam.set(team)
}
}
