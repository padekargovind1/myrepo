import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementArticlesComponent } from './etablissement-articles.component';

describe('EtablissementArticlesComponent', () => {
  let component: EtablissementArticlesComponent;
  let fixture: ComponentFixture<EtablissementArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissementArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
