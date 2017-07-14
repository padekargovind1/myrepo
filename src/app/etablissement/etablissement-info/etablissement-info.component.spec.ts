import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementInfoComponent } from './etablissement-info.component';

describe('EtablissementInfoComponent', () => {
  let component: EtablissementInfoComponent;
  let fixture: ComponentFixture<EtablissementInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
