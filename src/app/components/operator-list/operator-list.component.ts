import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConditionhandlerService } from '../../service/conditionhandler.service';
import { DatePickerComponent } from '../../common/date-picker/date-picker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operator-list',
  imports: [DatePickerComponent,CommonModule],
  templateUrl: './operator-list.component.html',
  styleUrl: './operator-list.component.scss'
})
export class OperatorListComponent implements OnInit,OnDestroy{

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
