import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinguisticTripsComponent } from './linguistic-trips.component';

describe('LinguisticTripsComponent', () => {
  let component: LinguisticTripsComponent;
  let fixture: ComponentFixture<LinguisticTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinguisticTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinguisticTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
