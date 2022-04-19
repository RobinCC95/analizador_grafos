import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoArchivoComponent } from './grafo-archivo.component';

describe('GrafoArchivoComponent', () => {
  let component: GrafoArchivoComponent;
  let fixture: ComponentFixture<GrafoArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafoArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafoArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
