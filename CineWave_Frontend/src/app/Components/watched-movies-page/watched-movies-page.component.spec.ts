import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedMoviesPageComponent } from './watched-movies-page.component';

describe('WatchedMoviesPageComponent', () => {
  let component: WatchedMoviesPageComponent;
  let fixture: ComponentFixture<WatchedMoviesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchedMoviesPageComponent]
    });
    fixture = TestBed.createComponent(WatchedMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
