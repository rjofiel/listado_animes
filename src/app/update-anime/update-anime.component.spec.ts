import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnimeComponent } from './update-anime.component';

describe('UpdateAnimeComponent', () => {
  let component: UpdateAnimeComponent;
  let fixture: ComponentFixture<UpdateAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAnimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
