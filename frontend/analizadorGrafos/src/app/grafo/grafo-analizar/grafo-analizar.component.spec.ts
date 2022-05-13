import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoAnalizarComponent } from './grafo-analizar.component';

describe('GrafoAnalizarComponent', () => {
  let component: GrafoAnalizarComponent;
  let fixture: ComponentFixture<GrafoAnalizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafoAnalizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafoAnalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
