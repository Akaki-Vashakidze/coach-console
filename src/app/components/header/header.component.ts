import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SessionData, Team, User } from '../../interfaces/interfaces';
import { SessionService } from '../../services/session.service';
import { SignInService } from '../../services/sign-in.service';
import { Router, RouterModule } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { ShortenPipe } from '../../pipes/shorten.pipe';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, RouterModule, ShortenPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
 @Input() menuItems!:{title:string, action:string}[]
 @Input() needUserInfo!:boolean;
 userData!:SessionData;
 teams = signal<Team[]>([{description:'',title:'',_id:''}])
 chosenTeam = signal<Team | null>(null)
 constructor(private sessionService:SessionService,private _router:Router, private teamService:TeamService ,private signInService:SignInService ){
  this.userData = sessionService.getSessionDataInfo();
 }

  ngOnInit() {
  let userId = this.userData?.user?.userId

  if(this.needUserInfo) {
    this.teamService.getCoachTeams(userId).subscribe(teams => {
      this.teams.set(teams)
      this.chosenTeam.set(this.teamService.getChosenTeam())
    })
  }
 }

 onMenuItemClick( action: string) {
  switch (action) {
    case 'log_out':
      this.logout();
      break;
    case 'team_details':
      this._router.navigate(['/coach/teamDetails'])
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
