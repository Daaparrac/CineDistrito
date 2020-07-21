import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  peliculas = [
    {
      img: 'assets/pe1.jpg',
    },
    {
      img: 'assets/pe2.jpg',
    },
    {
      img: 'assets/pe3.jpg',
    },
    {
      img: 'assets/pe4.jpg',
    },
    {
      img: 'assets/pe5.jpg',
    },
    {
      img: 'assets/pe6.jpg',
    },
    {
      img: 'assets/pe7.jpg',
    },
  ];

  peliculas2 = [
    {
      img: 'assets/pe8.jpg',
    },
    {
      img: 'assets/pe9.jpg',
    },
    {
      img: 'assets/pe10.jpg',
    },
    {
      img: 'assets/pe11.jpg',
    },
  ];
}
