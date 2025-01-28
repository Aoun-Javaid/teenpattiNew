import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{

  ngOnInit(): void {
    $(document).ready(() => {
      $('.loaderMain').css('display', 'none')
    });
  }
}
