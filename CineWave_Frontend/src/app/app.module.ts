import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationPageComponent } from './Components/registration-page/registration-page.component';
import { MoviePageComponent } from './Components/movie-page/movie-page.component';
import { FavoriteMoviesPageComponent } from './Components/favorite-movies-page/favorite-movies-page.component';
import { WatchedMoviesPageComponent } from './Components/watched-movies-page/watched-movies-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationPageComponent,
    MoviePageComponent,
    FavoriteMoviesPageComponent,
    WatchedMoviesPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
