import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TabsComponent],
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
