import { Component, OnInit, signal } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { EventDetails, Race } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-competition-registration',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    LoaderSpinnerComponent,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './competition-registration.component.html',
  styleUrls: ['./competition-registration.component.scss'],
})
export class CompetitionRegistrationComponent implements OnInit {
  event = signal<EventDetails | null>(null);
  myControl = new FormControl('');
  chosenRace: Race | null = null;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute
  ) {
    const eventId = this.route.snapshot.paramMap.get('id') || '';
    competitionService.getEventDetails(eventId).subscribe(item => {
      this.event.set(item);
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  chooseRace(race: Race) {
    this.chosenRace = race;
  }

  onTabChange(action:any) {
    this.chosenRace = null;
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase() || '';
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
