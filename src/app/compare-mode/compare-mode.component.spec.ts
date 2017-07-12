import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareModeComponent } from './compare-mode.component';

describe('CompareModeComponent', () => {
  let component: CompareModeComponent;
  let fixture: ComponentFixture<CompareModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
