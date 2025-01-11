import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent implements OnInit{

  ngOnInit(): void {
    $(document).ready(() => {
      $('.loaderMain').css('display', 'none')
    });
  }

}
