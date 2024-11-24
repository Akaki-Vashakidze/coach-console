import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CompetitionService } from '../../../services/competition.service';
import { EventDetails } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-comp-details',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardModule, LoaderSpinnerComponent, LabelComponent],
  templateUrl: './comp-details.component.html',
  styleUrl: './comp-details.component.scss'
})
export class CompDetailsComponent {
  event = signal<EventDetails | null>(null);
  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
  ) {
    const eventId = this.route.snapshot.paramMap.get('id') || '';

    competitionService.getEventDetails(eventId).subscribe((event) => {
      this.event.set(event);
    });
  }
}
