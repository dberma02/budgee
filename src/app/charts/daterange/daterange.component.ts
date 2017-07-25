import { Component, OnInit } from '@angular/core';

const MONTHS = [ 
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]


@Component({
  selector: 'daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent implements OnInit {

  constructor() { }

  monthName: string;
  month: number;
  years: Array<number> = [];
  year: number;

  ngOnInit() {
    var today = new Date;
    var curYear = today.getFullYear();
    for(let i = curYear; i > curYear - 5; i--){
      this.years.push(i);
    }
  }

  setMonth(): void {
    this.month = MONTHS.indexOf(this.monthName);
  }
  
  
}
