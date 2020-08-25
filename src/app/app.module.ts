import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentesModule } from './componentes/componentes.module';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NewTheaterComponent } from './pages/admin/new/new-theater/new-theater.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchTheaterComponent } from './pages/admin/search/search-theater/search-theater.component';
import { NewMovieComponent } from './pages/admin/new/new-movie/new-movie.component';
import { SearchMovieComponent } from './pages/admin/search/search-movie/search-movie.component';
import { NavbarAdminComponent } from './componentes/navbar-admin/navbar-admin.component';
import { FormsModule } from '@angular/forms';
import { NewRoomComponent } from './pages/admin/new/new-room/new-room.component';
import { SearchRoomComponent } from './pages/admin/search/search-room/search-room.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NewHourComponent } from './pages/admin/new/new-hour/new-hour.component';
import { SearchHourComponent } from './pages/admin/search/search-hour/search-hour.component';
import { MovieComponent } from './pages/movie/movie.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RoomComponent } from './componentes/shared/room/room.component';
import { CinemasComponent } from './componentes/shared/cinemas/cinemas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NewTheaterComponent,
    SearchTheaterComponent,
    NewMovieComponent,
    SearchMovieComponent,
    NavbarAdminComponent,
    NewRoomComponent,
    SearchRoomComponent,
    NewHourComponent,
    SearchHourComponent,
    MovieComponent,
    FilterPipe,
    RoomComponent,
    CinemasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
