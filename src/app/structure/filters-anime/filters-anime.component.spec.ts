import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersAnimeComponent } from './filters-anime.component';

describe('FiltersAnimeComponent', () => {
  let component: FiltersAnimeComponent;
  let fixture: ComponentFixture<FiltersAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersAnimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
