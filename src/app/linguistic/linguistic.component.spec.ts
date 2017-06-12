import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinguisticComponent } from './linguistic.component';

describe('LinguisticComponent', () => {
  let component: LinguisticComponent;
  let fixture: ComponentFixture<LinguisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinguisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinguisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
