import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  toggleNav() {
    const pageHeader = document.querySelector('header') as HTMLElement;
    const burgerMenu = document.querySelector(
      'header .container .burger-menu'
    ) as HTMLElement;
    const navList = document.querySelector(
      'header .container nav'
    ) as HTMLElement;
    pageHeader.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    navList.classList.toggle('active');
  }
  openForm() {
    const searchForm = document.querySelector(
      'header .container .navbar-actions form'
    ) as HTMLElement;
    searchForm.classList.add('active');
  }
  closeForm() {
    const searchForm = document.querySelector(
      'header .container .navbar-actions form'
    ) as HTMLElement;
    searchForm.classList.remove('active');
  }
}
