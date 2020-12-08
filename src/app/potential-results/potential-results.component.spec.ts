import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialResultsComponent } from './potential-results.component';

describe('PotentialResultsComponent', () => {
  let component: PotentialResultsComponent;
  let fixture: ComponentFixture<PotentialResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
