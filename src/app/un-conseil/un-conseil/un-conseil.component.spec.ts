import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnConseilComponent } from './un-conseil.component';

describe('UnConseilComponent', () => {
  let component: UnConseilComponent;
  let fixture: ComponentFixture<UnConseilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnConseilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnConseilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
