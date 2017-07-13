import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementEssentielComponent } from './etablissement-essentiel.component';

describe('EtablissementEssentielComponent', () => {
  let component: EtablissementEssentielComponent;
  let fixture: ComponentFixture<EtablissementEssentielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementEssentielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementEssentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
