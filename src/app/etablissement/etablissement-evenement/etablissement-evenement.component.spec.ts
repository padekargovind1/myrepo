import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementEvenementComponent } from './etablissement-evenement.component';

describe('EtablissementEvenementComponent', () => {
  let component: EtablissementEvenementComponent;
  let fixture: ComponentFixture<EtablissementEvenementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementEvenementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
