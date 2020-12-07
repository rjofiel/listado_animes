import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasAnimesComponent } from './datas-animes.component';

describe('DatasAnimesComponent', () => {
  let component: DatasAnimesComponent;
  let fixture: ComponentFixture<DatasAnimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasAnimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
