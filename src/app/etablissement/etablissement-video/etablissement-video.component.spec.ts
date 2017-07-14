import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementVideoComponent } from './etablissement-video.component';

describe('EtablissementVideoComponent', () => {
  let component: EtablissementVideoComponent;
  let fixture: ComponentFixture<EtablissementVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
