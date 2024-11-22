import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule,HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coach-console';
  menuItems = [
    {
      title: 'Log out',
      action: 'log_out'
    },
    {
      title: 'Personal Info',
      action: 'Personal_Info'
    },
  ]
}
