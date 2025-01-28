import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

  ngOnInit(): void {
    $(document).ready(() => {
      $('.loaderMain').css('display', 'none')
    });
  }

}
