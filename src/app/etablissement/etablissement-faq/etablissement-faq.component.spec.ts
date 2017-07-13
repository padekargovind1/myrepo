import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementFaqComponent } from './etablissement-faq.component';

describe('EtablissementFaqComponent', () => {
  let component: EtablissementFaqComponent;
  let fixture: ComponentFixture<EtablissementFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
