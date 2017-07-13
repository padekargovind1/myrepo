import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochureCardComponent } from './brochure-card.component';

describe('BrochureCardComponent', () => {
  let component: BrochureCardComponent;
  let fixture: ComponentFixture<BrochureCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrochureCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrochureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
