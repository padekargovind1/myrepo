import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountMysearchComponent } from './myaccount-mysearch.component';

describe('MyaccountMysearchComponent', () => {
  let component: MyaccountMysearchComponent;
  let fixture: ComponentFixture<MyaccountMysearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountMysearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountMysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
