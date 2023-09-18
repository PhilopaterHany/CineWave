import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationPageComponent} from "./Components/registration-page/registration-page.component";
import {MainPageComponent} from "./Components/main-page/main-page.component";
import {MoviePageComponent} from "./Components/movie-page/movie-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'movie', component: MoviePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
