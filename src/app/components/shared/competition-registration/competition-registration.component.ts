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
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  athleteResControl = new FormControl('');
  chosenRace: Race | null = null;
  filteredOptions = signal<TeamAthleteQualifications[] | null | undefined>(null);
  athletes = signal<TeamAthleteQualifications[] | null>(null);
  blockADD:boolean = true;
  AthleteResultValue:string | null = null;
  eventId!:string;
  registerAthleteForm!:FormGroup;
  chosenAthleteToRegister!:TeamAthleteQualifications;
  constructor(
    private competitionService: CompetitionsService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private sharedService:SharedService,
    private sessionService:SessionService,
    private convertItimeService:ConvertItimeService,
    private fb: FormBuilder,
  ) {
     this.eventId = this.route.snapshot.paramMap.get('id') || '';
     this.registerAthleteForm = this.fb.group({
      athleteInfo: ['', [Validators.required]],
      athleteResult: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
    });
    this.registerAthleteForm.get('athleteResult')?.disable();
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
    this.registerAthleteForm.get('athleteInfo')?.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : '')),
      map((value) => this._filter(value))
    ).subscribe((filtered) => {
      this.filteredOptions.set(filtered);
    });

    let prevValue:any;
    this.registerAthleteForm.get('athleteResult')?.valueChanges.subscribe(item => {
      if (item && item.length === 2 && prevValue.split('')[2] != ':') {
        const updatedValue = `${item}:`;
        this.registerAthleteForm.get('athleteResult')?.setValue(updatedValue, {
          emitEvent: false,
        });
      } 
      if (item && item.length === 5 && prevValue.split('')[5] != '.') {
        const updatedValue = `${item}.`;
        this.registerAthleteForm.get('athleteResult')?.setValue(updatedValue, {
          emitEvent: false,
        });
      }
      console.log(item)
      prevValue = item;
    })
    
  }
  

  chooseRace(race: Race) {
    this.chosenRace = race;
    this.clearForm()
    this.getCoachTeamAthleteQualifications(race._id)
  }

  clearForm() {
    this.registerAthleteForm.reset(); 
    this.blockADD = true; 
  }

  onTabChange(action: any) {
    this.chosenRace = null;
  }

  addAthlete() {
    let coachId = this.sessionService.userId;
    let teamId = this.teamService.chosenTeam._id;
    console.log(this.registerAthleteForm.value.athleteInfo, this.registerAthleteForm.value)
    let time;
    if(this.chosenAthleteToRegister.result) {
      time = this.chosenAthleteToRegister.result.result.time;
    } else {
      time = this.convertItimeService.convertStringTimeToItime(this.registerAthleteForm.value.athleteResult || '')
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
      this.registerAthleteForm.get('athleteResult')?.disable();
      this.AthleteResultValue = this.chosenAthleteToRegister.result.result.time.minutes + ':' + this.chosenAthleteToRegister.result.result.time.seconds + '.' + this.chosenAthleteToRegister.result.result.time.milliseconds
    } else {
      this.AthleteResultValue = null;
      this.registerAthleteForm.get('athleteResult')?.enable();
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
