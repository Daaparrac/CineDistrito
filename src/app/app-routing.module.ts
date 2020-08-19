import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NewTheaterComponent } from './pages/admin/new/new-theater/new-theater.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchTheaterComponent } from './pages/admin/search/search-theater/search-theater.component';
import { NewMovieComponent } from './pages/admin/new/new-movie/new-movie.component';
import { SearchMovieComponent } from './pages/admin/search/search-movie/search-movie.component';
import { NewRoomComponent } from './pages/admin/new/new-room/new-room.component';
import { SearchRoomComponent } from './pages/admin/search/search-room/search-room.component';
import { NewHourComponent } from './pages/admin/new/new-hour/new-hour.component';
import { SearchHourComponent } from './pages/admin/search/search-hour/search-hour.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'admin', component: DashboardComponent
  },
  {
    path: 'admin/new/theater/:id', component: NewTheaterComponent
  },
  {
    path: 'admin/search/theater', component: SearchTheaterComponent
  },
  {
    path: 'admin/new/movie/:id', component: NewMovieComponent
  },
  {
    path: 'admin/search/movie', component: SearchMovieComponent
  },
  {
    path: 'admin/new/room/:id', component: NewRoomComponent
  },
  {
    path: 'admin/search/room', component: SearchRoomComponent
  },
  {
    path: 'admin/new/hour/:id', component: NewHourComponent
  },
  {
    path: 'admin/hour/room', component: SearchHourComponent
  },
  { 
    path: '**', pathMatch: 'full', redirectTo: 'home' 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
