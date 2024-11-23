import { Component, signal } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { EventDetails } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-competition-registration',
  standalone: true,
  imports: [CommonModule,LoaderSpinnerComponent, MatTabsModule, MatCardModule],
  templateUrl: './competition-registration.component.html',
  styleUrl: './competition-registration.component.scss'
})
export class CompetitionRegistrationComponent {
  event = signal<EventDetails | null>(null)
  constructor(private competitionService:CompetitionService,private route: ActivatedRoute){
    const eventId = this.route.snapshot.paramMap.get('id') || '';
    competitionService.getEventDetails(eventId).subscribe(item => {
      console.log(item)
      this.event.set(item)
    })
  }
}
