import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountParentsComponent } from './myaccount-parents.component';

describe('MyaccountParentsComponent', () => {
  let component: MyaccountParentsComponent;
  let fixture: ComponentFixture<MyaccountParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
