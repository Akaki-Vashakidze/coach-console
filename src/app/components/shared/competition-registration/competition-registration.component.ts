import { Component, OnInit, signal } from '@angular/core';
import { CompetitionsService } from '../../../services/competitions.service';
import { Athlete, EventDetails, Race } from '../../../interfaces/interfaces';
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
import { TeamService } from '../../../services/team.service';
import { MatButtonModule } from '@angular/material/button';

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
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './competition-registration.component.html',
  styleUrls: ['./competition-registration.component.scss'],
})
export class CompetitionRegistrationComponent implements OnInit {
  event = signal<EventDetails | null>(null);
  myControl = new FormControl('');
  chosenRace: Race | null = null;
  filteredOptions = signal<Athlete[] | null | undefined>(null);
  athletes = signal<Athlete[] | null>(null);

  constructor(
    private competitionService: CompetitionsService,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {
    const eventId = this.route.snapshot.paramMap.get('id') || '';
    
    teamService
      .getTeamAthletes()
      .pipe(
        map((item: any) => item.map((athleteWrapper: any) => athleteWrapper.athlete))
      )
      .subscribe((athletes) => {
        this.athletes.set(athletes);
      });

    competitionService.getEventDetails(eventId).subscribe((event) => {
      this.event.set(event);
    });
  }

  ngOnInit(): void {
    this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : '')),
      map((value) => this._filter(value))
    ).subscribe((filtered) => {
      this.filteredOptions.set(filtered);
    });
  }
  

  chooseRace(race: Race) {
    this.chosenRace = race;
  }

  onTabChange(action: any) {
    this.chosenRace = null;
  }

  addAthlete() {
    // todo athlete add in race
    console.log(this.chosenRace)
    console.log('Selected Athlete:', this.myControl.value);

  }

  private _filter(value: string | null): Athlete[] | null {
    const filterValue = (value || '').toLowerCase()
    const result = this.athletes()?.filter(
      (athlete) =>
        athlete.lastName.toLowerCase().includes(filterValue) ||
        athlete.firstName.toLowerCase().includes(filterValue)
    );
  
    return result?.length ? result : null;
  }
  

  displayFn(option: Athlete): string {
    return option ? `${option.lastName} ${option.firstName}` : '';
  }
}
