import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountChildrenComponent } from './myaccount-children.component';

describe('MyaccountChildrenComponent', () => {
  let component: MyaccountChildrenComponent;
  let fixture: ComponentFixture<MyaccountChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
