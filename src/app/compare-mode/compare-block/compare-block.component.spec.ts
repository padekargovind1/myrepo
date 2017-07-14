import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareBlockComponent } from './compare-block.component';

describe('CompareBlockComponent', () => {
  let component: CompareBlockComponent;
  let fixture: ComponentFixture<CompareBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
