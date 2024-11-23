import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TabsComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(private _router:Router){}
  tabChosenIndex!:number;
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

  ngOnInit() {
    if (this._router.url.endsWith('competitions')) {
      this.tabChosenIndex = 1
    } else if(this._router.url.endsWith('teams')) {
      this.tabChosenIndex = 0
    }
  }

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
