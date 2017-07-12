import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyceeComponent } from './lycee.component';

describe('LyceeComponent', () => {
  let component: LyceeComponent;
  let fixture: ComponentFixture<LyceeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyceeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyceeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
