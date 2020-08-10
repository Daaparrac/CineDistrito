import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { peliculasModel } from 'src/app/models/peliculas.model';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  peliculas: peliculasModel[] = [];

  constructor(private _moviesService: MoviesService) { }

  ngOnInit(): void {
    this._moviesService.getMovies().subscribe(data => this.peliculas = data);
  }

}
