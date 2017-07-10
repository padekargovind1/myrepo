import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountDocumentationsComponent } from './myaccount-documentations.component';

describe('MyaccountDocumentationsComponent', () => {
  let component: MyaccountDocumentationsComponent;
  let fixture: ComponentFixture<MyaccountDocumentationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountDocumentationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountDocumentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
