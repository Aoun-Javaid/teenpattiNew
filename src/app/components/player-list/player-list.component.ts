import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePickerComponent } from "../../common/date-picker/date-picker.component";
import { ConditionhandlerService } from '../../service/conditionhandler.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  imports: [DatePickerComponent,CommonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit,OnDestroy{

  isSectionVisible: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private conditionalService:ConditionhandlerService, private router: Router){}

  ngOnInit(): void {
    
    this.subscription = this.conditionalService.getSection().subscribe(
      (state) => {
        this.isSectionVisible = state;
      }
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.conditionalService.setSection(false);
      }
    });
  }
    ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
