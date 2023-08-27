import { Injectable } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(private header: HeaderComponent) {}

  toggleNav() {
    const pageHeader = document.querySelector('header') as HTMLElement;
    const burgerMenu = document.querySelector(
      'header .navbar-container .burger-menu'
    ) as HTMLElement;
    const navList = document.querySelector(
      'header .navbar-container nav'
    ) as HTMLElement;
    pageHeader.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    navList.classList.toggle('active');
  }
  openForm() {
    const searchForm = document.querySelector(
      'header .navbar-container .navbar-actions form'
    ) as HTMLElement;
    searchForm.classList.add('active');
  }
  closeForm() {
    const searchForm = document.querySelector(
      'header .navbar-container .navbar-actions form'
    ) as HTMLElement;
    searchForm.classList.remove('active');
  }
}
