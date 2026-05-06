import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListaEstablecimientoComponent } from './modal-lista-establecimientos.component';

describe('ModalListaEstablecimientoComponent', () => {
  let component: ModalListaEstablecimientoComponent;
  let fixture: ComponentFixture<ModalListaEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalListaEstablecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalListaEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
