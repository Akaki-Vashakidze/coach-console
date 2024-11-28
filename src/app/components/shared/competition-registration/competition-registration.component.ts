import { Component, OnInit, signal } from '@angular/core';
import { CompetitionsService } from '../../../services/competitions.service';
import { Athlete, EventDetails, Race, TeamAthleteQualifications } from '../../../interfaces/interfaces';
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
import { ConvertItimeService } from '../../../services/convert-itime.service';

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
  athleteResControl = new FormControl('');
  chosenRace: Race | null = null;
  filteredOptions = signal<TeamAthleteQualifications[] | null | undefined>(null);
  athletes = signal<TeamAthleteQualifications[] | null>(null);
  blockADD:boolean = true;
  disableAthleteResValue : boolean = true;
  AthleteResultValue:string | null = null;
  eventId!:string;
  chosenAthleteToRegister!:TeamAthleteQualifications;
  constructor(
    private competitionService: CompetitionsService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private sharedService:SharedService,
    private sessionService:SessionService,
    private convertItimeService:ConvertItimeService
  ) {
     this.eventId = this.route.snapshot.paramMap.get('id') || '';
    
    // teamService
    //   .getTeamAthletes()
    //   .pipe(
    //     map((item: any) => item.map((athleteWrapper: any) => athleteWrapper.athlete))
    //   )
    //   .subscribe((athletes) => {
    //     this.athletes.set(athletes);
    //   });

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

  }
  

  chooseRace(race: Race) {
    this.chosenRace = race;
    this.clearForm()
    this.getCoachTeamAthleteQualifications(race._id)
  }

  clearForm() {
    this.myControl.reset(); 
    this.blockADD = true; 
  }

  onTabChange(action: any) {
    this.chosenRace = null;
  }

  addAthlete() {
    let coachId = this.sessionService.userId;
    let teamId = this.teamService.chosenTeam._id;
    console.log(this.myControl.value, this.athleteResControl.value)
    let time;
    if(this.chosenAthleteToRegister.result) {
      time = null;
    } else {
      time = this.convertItimeService.convertStringTimeToItime(this.athleteResControl.value || '')
    }
    
    console.log(time)
    this.competitionService.addEventPartiipant(coachId,teamId,this.eventId,this.chosenAthleteToRegister.member.athlete._id,this.chosenRace?._id || '',time || null).subscribe(item => {
      console.log(item)
    })
  }
//registered Athletes list
//teamId
//raceId


getCoachTeamAthleteQualifications(raceId:string){
  this.teamService.getCoachTeamAthleteQualifications(raceId).subscribe(item => {
    console.log(item)
    this.athletes.set(item)
  })
}


  //fornewMethod
  //teamId
  //raceId

  onOptionSelected(event:any){
    this.chosenAthleteToRegister = event.option.value;
    console.log(this.chosenAthleteToRegister)
    this.blockADD = false;
    if(this.chosenAthleteToRegister.result){
      this.disableAthleteResValue = true;
      this.AthleteResultValue = this.chosenAthleteToRegister.result.result.time.seconds
    } else {
      this.disableAthleteResValue = false;
    }
    // this.sharedService.getAthleteBestResult(this.chosenRace?._id || '', event.option.value._id || '').subscribe(item => {
    //   console.log(item)
    //   
    // })
  }

  // deleteEventParticipant(){
  //   let coachId = this.sessionService.userId;
  //   let teamId = this.teamService.chosenTeam._id;
  //   this.competitionService.deleteEventPartiipant(coachId,teamId,this.eventId,this.chosenAthleteToRegister._id,this.chosenRace?._id || '').subscribe(item => {
  //     console.log(item)
  //   })
  // }

  private _filter(value: string | null): TeamAthleteQualifications[] | null {
    const filterValue = (value || '').toLowerCase()
    const result = this.athletes()?.filter(
      (athlete) =>
        athlete?.member.athlete.lastName.toLowerCase().includes(filterValue) ||
        athlete?.member.athlete.lastName.toLowerCase().includes(filterValue)
    );
    return result?.length ? result : null;
  }
  

  displayFn(option: TeamAthleteQualifications): string {
    return option ? `${option?.member?.athlete?.lastName} ${option?.member?.athlete?.firstName}` : '';
  }
}
