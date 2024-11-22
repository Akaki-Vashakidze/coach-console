import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TabsComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private _router:Router){}
  dashboardTabs = [
    {
      title:'teams',
      action:'teams'
    },
    {
      title:'competitions',
      action:'competitions'
    },
  ]

  onTabsChange(tab:string){
    console.log(tab)
    switch (tab) {
      case 'teams':
        this._router.navigate(['coach/dashboard/teams'])
        break;
      case 'competitions':
        this._router.navigate(['coach/dashboard/competitions'])
        break;
      default:
    }
  
  }

}
