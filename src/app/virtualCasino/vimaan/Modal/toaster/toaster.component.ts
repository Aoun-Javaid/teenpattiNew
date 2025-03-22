import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';


@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css',
})
export class ToasterComponent implements OnInit,OnChanges {
  toasterState: boolean = false;
  @Input() toasterSuccess: boolean = true;
  @Input() toasterError: boolean = false;
  @Input() errorMsg!: string;
  @Input() betMultiVal!: string;
  @Input() betCashOutAmount!: string;
  @Input() toasterType: string = '';
  @Output() disposeEvent = new EventEmitter();

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.closeToaster();
    // }, 4000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['toasterType'] && changes['toasterType'].currentValue !== changes['toasterType'].previousValue) {

      setTimeout(() => {

        this.closeToaster();
      }, 3000);
    }
  }
  closeToaster() {
    this.disposeEvent.emit();
    this.toasterType = '';
  }
}
