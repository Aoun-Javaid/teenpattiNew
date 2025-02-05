import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-results.component.html',
  styleUrl: './top-results.component.css'
})
export class TopResultsComponent {

  betHistory = [
    {
      winner: 'A',
      color: 'Red',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'A',
      color: 'Red',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'A',
      color: 'Red',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'A',
      color: 'Red',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'A',
      color: 'Red',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'A',
      color: 'Red',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'A',
      color: 'Red',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
    {
      winner: 'B',
      color: 'Yellow',
    },
  ];
}
