import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {

  /*
  This service provides the following:
  1- Utilities function that may be used by multiple components.
  2- Objects Passing Technique, to allow components communication.
  */

  // The user (currently logged in) object.
  private currentUser: object | undefined;

  constructor() {}

  setCurrentUser(currentUser: object){
    this.currentUser = currentUser;
  }

  getCurrentUser(){
    return this.currentUser;
  }
}
