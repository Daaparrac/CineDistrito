import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { peliculasModel } from 'src/app/models/peliculas.model';

@Component({
  selector: 'app-search-theater',
  templateUrl: './search-theater.component.html',
  styleUrls: ['./search-theater.component.scss']
})
export class SearchTheaterComponent implements OnInit {

  horarios: peliculasModel[] = [];

  constructor(private _moviesService: MoviesService) { }

  ngOnInit(): void {
  this._moviesService.getMovies().subscribe(data => console.log(data));
  }

}
