import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementMediaComponent } from './etablissement-media.component';

describe('EtablissementMediaComponent', () => {
  let component: EtablissementMediaComponent;
  let fixture: ComponentFixture<EtablissementMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
