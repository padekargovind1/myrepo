import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementFormationComponent } from './etablissement-formation.component';

describe('EtablissementFormationComponent', () => {
  let component: EtablissementFormationComponent;
  let fixture: ComponentFixture<EtablissementFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
