import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoViewComponent } from './grafo-view.component';

describe('GrafoViewComponent', () => {
  let component: GrafoViewComponent;
  let fixture: ComponentFixture<GrafoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
