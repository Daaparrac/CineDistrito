import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  pelicula: any;

  constructor(
    private activatedRouteact: ActivatedRoute,
    private moviesService: MoviesService
  ) {
    const id = this.activatedRouteact.snapshot.paramMap.get('id');
    this.moviesService
      .getPelicula(id)
      .subscribe((data) => (this.pelicula = data));
  }

  ngOnInit(): void {}
}
