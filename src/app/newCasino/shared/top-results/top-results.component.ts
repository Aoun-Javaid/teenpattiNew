import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../services/network.service';

@Component({
  selector: 'app-top-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-results.component.html',
  styleUrl: './top-results.component.css'
})
export class TopResultsComponent implements OnInit{


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

  constructor(private networkService:NetworkService){

  }
  ngOnInit(): void {


    this.networkService.getResultstream().subscribe(data => {
      // this.betHistory = data;

    })
  }
}
