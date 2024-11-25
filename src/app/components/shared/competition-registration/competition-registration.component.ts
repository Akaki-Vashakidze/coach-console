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
import { SharedService } from '../../../services/shared.service';
import { SessionService } from '../../../services/session.service';

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
  blockADD:boolean = true;
  eventId!:string;
  chosenAthleteToRegister!:Athlete;
  constructor(
    private competitionService: CompetitionsService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private sharedService:SharedService,
    private sessionService:SessionService
  ) {
     this.eventId = this.route.snapshot.paramMap.get('id') || '';
    
    teamService
      .getTeamAthletes()
      .pipe(
        map((item: any) => item.map((athleteWrapper: any) => athleteWrapper.athlete))
      )
      .subscribe((athletes) => {
        this.athletes.set(athletes);
      });

    competitionService.getEventDetails(this.eventId).subscribe((event) => {
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

    this.myControl.valueChanges.subscribe(value => {
      console.log('Input changed to:', value);
      // Add filtering logic or other actions
      this.blockADD = true;
    });
  }
  

  chooseRace(race: Race) {
    this.chosenRace = race;
  }

  onTabChange(action: any) {
    this.chosenRace = null;
  }

  addAthlete() {
    let coachId = this.sessionService.userId;
    let teamId = this.teamService.chosenTeam._id;

    this.competitionService.addEventPartiipant(coachId,teamId,this.eventId,this.chosenAthleteToRegister._id,this.chosenRace?._id || '').subscribe(item => {
      console.log(item)
    })
  }

  onOptionSelected(event:any){
    this.chosenAthleteToRegister = event.option.value;
    this.sharedService.getAthleteBestResult(this.chosenRace?._id || '', event.option.value._id || '').subscribe(item => {
      console.log(item)
      this.blockADD = false;
    })
  }

  deleteEventParticipant(){
    let coachId = this.sessionService.userId;
    let teamId = this.teamService.chosenTeam._id;
    this.competitionService.deleteEventPartiipant(coachId,teamId,this.eventId,this.chosenAthleteToRegister._id,this.chosenRace?._id || '').subscribe(item => {
      console.log(item)
    })
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
