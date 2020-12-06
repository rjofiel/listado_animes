import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniLoginComponent } from './ani-login.component';

describe('AniLoginComponent', () => {
  let component: AniLoginComponent;
  let fixture: ComponentFixture<AniLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AniLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
