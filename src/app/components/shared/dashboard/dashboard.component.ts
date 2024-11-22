import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TabsComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
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

  }

}
