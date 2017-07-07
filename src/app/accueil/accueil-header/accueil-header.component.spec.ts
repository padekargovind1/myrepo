import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilHeaderComponent } from './accueil-header.component';

describe('AccueilHeaderComponent', () => {
  let component: AccueilHeaderComponent;
  let fixture: ComponentFixture<AccueilHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
