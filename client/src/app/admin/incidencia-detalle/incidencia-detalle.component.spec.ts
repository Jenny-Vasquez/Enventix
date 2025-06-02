import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciaDetalleComponent } from './incidencia-detalle.component';

describe('IncidenciaDetalleComponent', () => {
  let component: IncidenciaDetalleComponent;
  let fixture: ComponentFixture<IncidenciaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenciaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
