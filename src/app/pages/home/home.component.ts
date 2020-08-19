import { Component, OnInit } from '@angular/core';
import { peliculasModel } from '../../models/peliculas.model';
import { MoviesService } from '../../services/movies.service';
import { SalasModel } from '../../models/salas.model';
import { RestService } from '../../services/rest.service';
import { TheaterModel } from '../../models/theater.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  peliculas: peliculasModel[] = [];

  teatro: TheaterModel[] = [];
  constructor(
    private _moviesService: MoviesService,
    private _rest: RestService
  ) {}

  ngOnInit(): void {
    this._moviesService
      .getMovies()
      .subscribe((data) => (this.peliculas = data));
    this._rest.getAllTeatros().subscribe((res) => (this.teatro = res));
  }
}
