import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementAssoComponent } from './etablissement-asso.component';

describe('EtablissementAssoComponent', () => {
  let component: EtablissementAssoComponent;
  let fixture: ComponentFixture<EtablissementAssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementAssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementAssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
