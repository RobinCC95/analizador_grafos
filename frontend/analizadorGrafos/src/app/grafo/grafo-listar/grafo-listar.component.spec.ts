import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoListarComponent } from './grafo-listar.component';

describe('GrafoListarComponent', () => {
  let component: GrafoListarComponent;
  let fixture: ComponentFixture<GrafoListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafoListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
